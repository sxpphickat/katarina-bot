const { SlashCommandBuilder } = require('discord.js');
const { AsciiTable3, AlignmentEnum } = require('ascii-table3');
const { PrismaClient } = require('@prisma/client');
const { getEntries } = require('../../utils/riotApiCalls');
const { comparePlayers } = require('../../utils/compareRanking');
const { winrate } = require('../../utils/winrate');

const prisma = new PrismaClient();

module.exports = {
  data: new SlashCommandBuilder()
            .setName('leaderboard')
            .setDescription('show server ranking')
            .addStringOption(option => 
              option.setName('style')
                    .setDescription('select print style.')
                /*     .addChoices(
                 { name: 'Terminal', value: 'terminal' }, 
                 { name: 'MarkDown', value: 'markdown' } )*/)
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
        return [index + 1, `${player.gameName}\u001b[0;30m#${player.tagLine}\u001b[0;0m` ,'UNRANKED', '', '', '',];
      }
      return [
        index + 1, 
        `${player.gameName}\u001b[0;30m#${player.tagLine}\u001b[0;0m`,
        `${player['0'].tier}`,
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
