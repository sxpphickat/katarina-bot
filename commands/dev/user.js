const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
            .setName('user')
            .setDescription('Provides information about the user.'),
  async execute(interaction) {
    // await interaction.reply(`This commands was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
    const text = "\u001b[0;40mExample\u001b[0;0m \u001b[0;41mExample\u001b[0;0m \u001b[0;42mExample\u001b[0;0m \u001b[0;43mExample\u001b[0;0m \u001b[0;44mExample\u001b[0;0m \u001b[0;45mExample\u001b[0;0m \u001b[0;46mExample\u001b[0;0m \u001b[0;47mExample\u001b[0;0m";
    await interaction.reply(`\`\`\`ansi\n${text} \`\`\``);
  },
};
