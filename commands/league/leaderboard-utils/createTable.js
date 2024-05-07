const { AsciiTable3, AlignmentEnum } = require('ascii-table3');
const { comparePlayers } = require("../../../utils/compareRanking");
const { playerGames } = require("../../../utils/playerGames");
const { tierColor } = require("../../../utils/tierColor");
const { winrate } = require("../../../utils/winrate");


/** 
 * @param {Date} date 
 * */
function dateFormatter(date) {
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);
  const hour = date.getHours();
  const minute = date.getMinutes();

  const formattedDate = `${day}/${month}/${year} ${hour}:${minute < 10 ? '0' : ''}${minute}`;
  return formattedDate;
}

async function createTable(interaction, guildInfo, players) {
  
  players.sort(comparePlayers);

  const queueType = 'RANKED_SOLO_5x5';
  const entryMatrix = players.map((player, index) => {
    if (Object.keys(player.entries[queueType]).length === 0) {
      return [
        `${index + 1 <= 3 ? '\u001b[1;31m' : ''}${index + 1}\u001b[0;0m`, 
        `${player.gameName}\u001b[0;30m#${player.tagLine}\u001b[0;0m`,
        '\u001b[1;30mUNRANKED\u001b[0;0m',
        '', '', '', '',];
    }
    return [
      `${index + 1 <= 3 ? '\u001b[1;31m' : ''}${index + 1}\u001b[0;0m`, 
      `${player.gameName}\u001b[0;30m#${player.tagLine}\u001b[0;0m`,
      tierColor(player.entries[queueType].tier),
      player.entries[queueType].rank,
      player.entries[queueType].leaguePoints,
      winrate(player, queueType),
      playerGames(player, queueType), 
    ];
  });

  const table =
        new AsciiTable3(`${interaction.guild.name}'s ranking`)
        .setHeading('#', 'Summoner', 'Tier', 'Rank', 'LP', 'Winrate', 'Games')
        .addRowMatrix(entryMatrix)
        .setAligns([AlignmentEnum.CENTER, AlignmentEnum.LEFT, AlignmentEnum.LEFT, AlignmentEnum.LEFT, AlignmentEnum.RIGHT, AlignmentEnum.CENTER, AlignmentEnum.CENTER]);

  table.setStyle('unicode-single');

  const lastUpdate = `Last Update: ${dateFormatter(guildInfo.lastUpdate)}`;
  
  const stringTable = `\`\`\`ansi\n${table.toString()}\n${lastUpdate}\`\`\``;

  return stringTable;
}

module.exports = { createTable };
