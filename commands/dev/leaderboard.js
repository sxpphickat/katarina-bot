const { SlashCommandBuilder } = require('discord.js');
const { AsciiTable3 } = require('ascii-table3');

module.exports = {
  data: new SlashCommandBuilder()
            .setName('leaderboard')
            .setDescription('show server ranking')
            .addStringOption(option => 
              option.setName('style')
                    .setDescription('select print style.')
                    .addChoices(
                { name: 'Terminal', value: 'terminal' }, 
                { name: 'MarkDown', value: 'markdown' },
              )),
  async execute(interaction) {

    // table according to database
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
    await interaction.reply(`\`\`\`${table.toString()}\`\`\``);
  }
}
