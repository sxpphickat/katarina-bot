const { SlashCommandBuilder } = require('discord.js');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * set the value true or false in the db
 * @param {boolean} value  
 * @param {string} guildId 
 * */
async function setGreetingDB(guildId, value) {
  await prisma.guildInfo.update({
    where: { guildId: guildId},
    data: { isGreetingEnabled: value },
  })
}

module.exports = {
  data: new SlashCommandBuilder() 
        .setName('toggle-greeting')
        .setDescription('Turn greeting on and off')
        .setDefaultMemberPermissions(0)
        .setDMPermission(false)
        .addBooleanOption(option => 
          option.setName('value')
                .setDescription('On or Off')
                .setRequired(true)),
  async execute(interaction) {
    try {
      const value = interaction.options.getBoolean('value');
      await setGreetingDB(interaction.guildId, value);
      await interaction.reply({
        content: `> Greeting turned **${value ? 'On' : 'Off'}**`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
    } 
  }
}
