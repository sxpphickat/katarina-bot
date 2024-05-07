const { Events } = require('discord.js');
const { updateLeaderboard } = require('../commands/league/leaderboard-utils/updateLeaderboard');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {    
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) {
        console.log(`No command matching ${interaction} was found!`);
        return ;
      }
      try {
        await command.execute(interaction);
      } catch (error) {
        console.log(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: 'There was an error while executing this command', ephemeral: true });
        } else {
          await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
        }
      }
    } else if (interaction.isAutocomplete()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) {
      console.log(`No command matching ${interaction} was found!`);
       return ;
      } 
      await command.autocomplete(interaction)
        .catch(console.error);
    } else if (interaction.isButton()) {
      if (interaction.customId === 'update-leaderboard') {
        updateLeaderboard(interaction);
      }
    }
  }
}
