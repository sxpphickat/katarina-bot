const { SlashCommandBuilder }  = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const slashCommand = new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!');

async function execute(interaction) {
  const locales = {
    br: 'Olá mundo!',
    de: 'Hallo welt!',
  }
  await interaction.reply(locales[interaction.locale] ?? 'hello world!');
}

module.exports = {
  data: slashCommand,
  execute: execute
};
