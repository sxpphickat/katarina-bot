const { SlashCommandBuilder } = require('discord.js');
const { AsciiTable3 } = require('ascii-table3');
const { PrismaClient } = require('@prisma/client');
const { getEntries } = require('../../utils/riotApiCalls');

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


    console.log(entries);
  

    const table =
          new AsciiTable3(`${interaction.guild.name}'s ranking`)
          .setHeading('#', 'Summoner', 'Tier', 'LP')
          .addRowMatrix([
               ['0', 'John', 'EMERALD IV', 88],
               ['0', 'Mary', 16, 'brown'],
               ['0', 'Rita', 47, 'blue'],
               ['0', 'Peter', 8, 'brown']
    ]);
    table.setStyle('unicode-single');
    await interaction.editReply(`\`\`\`${table.toString()}\`\`\``);
  }
}
