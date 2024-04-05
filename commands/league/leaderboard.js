const { SlashCommandBuilder } = require('discord.js');
const { AsciiTable3, AlignmentEnum } = require('ascii-table3');
const { PrismaClient } = require('@prisma/client');
const { getEntries } = require('../../utils/riotApiCalls');
const { comparePlayers } = require('../../utils/compareRanking');
const { winrate } = require('../../utils/winrate');
const { tierColor } = require('../../utils/tierColor');

const prisma = new PrismaClient();

module.exports = {
  data: new SlashCommandBuilder()
            .setName('leaderboard')
            .setDescription('show server ranking')
            .setDMPermission(false),
  async execute(interaction) {
    await interaction.deferReply();

    const leaderboard = await prisma.leaderboard.findUnique({
      where: { guildId: interaction.guildId }
    })

    if (!leaderboard) {
      await interaction.editReply(`No players found! Use the **/add-player** command to add players`);
      return ;
    }

    const serverPlayerList = JSON.parse(leaderboard.playersArray);

    const players = await prisma.Player.findMany({
      where: {
        id: { in: serverPlayerList },
      }
    });

    // console.log(players);

    const entries = await getEntries(players);    

    entries.sort(comparePlayers);

    // console.log(entries);

    const entryMatrix = entries.map((player, index) => {
      if (!Object.hasOwn(player, '0')) {
        return [
          `${index + 1 <= 3 ? '\u001b[1;31m' : ''}${index + 1}\u001b[0;0m`, 
          `${player.gameName}\u001b[0;30m#${player.tagLine}\u001b[0;0m`,
          '\u001b[1;30mUNRANKED\u001b[0;0m',
          '', '', '',];
      }
      return [
        `${index + 1 <= 3 ? '\u001b[1;31m' : ''}${index + 1}\u001b[0;0m`, 
        `${player.gameName}\u001b[0;30m#${player.tagLine}\u001b[0;0m`,
        tierColor(player['0'].tier),
        player['0'].rank,
        player['0'].leaguePoints,
        winrate(player),
      ];
    });

    const table =
          new AsciiTable3(`${interaction.guild.name}'s ranking`)
          .setHeading('#', 'Summoner', 'Tier', 'Rank', 'LP', 'Winrate')
          .addRowMatrix(entryMatrix)
          .setAligns([AlignmentEnum.CENTER, AlignmentEnum.LEFT, AlignmentEnum.LEFT, AlignmentEnum.LEFT, AlignmentEnum.RIGHT, AlignmentEnum.CENTER]);


    table.setStyle('unicode-single');
    await interaction.editReply(`\`\`\`ansi\n${table.toString()}\`\`\``);
  }
}
