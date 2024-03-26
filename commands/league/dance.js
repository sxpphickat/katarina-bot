const { SlashCommandBuilder }  = require('discord.js');

const slashCommand = new SlashCommandBuilder().setName('dance').setDescription('Katarina dancing gif, so cool!');

async function execute(interaction) {
  await interaction.reply('https://media.tenor.com/LvThoInfEAcAAAAi/katarina.gif');
}

module.exports = {
  data: slashCommand,
  execute: execute
};
