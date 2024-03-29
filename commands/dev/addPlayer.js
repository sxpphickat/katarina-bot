const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('add-player')
        .setDescription('add a player to the player list.')
        .addStringOption(option => 
          option.setName('game-name')
                .setDescription('Game Name + #tag')
                .setRequired(true)),
  async execute(interaction) {
    await interaction.reply(interaction.options.getString('game-name')); 
  }
}
