const { SlashCommandBuilder }  = require('discord.js');

const slashCommand = new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!');

async function execute(interaction) {
  await interaction.reply('Pong!');
}

module.exports = {
  data: slashCommand,
  execute: execute
};
