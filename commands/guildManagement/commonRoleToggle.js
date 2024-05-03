const { SlashCommandBuilder } = require('discord.js');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * set the value true or false in the db
 * @param {boolean} value  
 * @param {string} guildId 
 * */
async function setCommonRoleDB(guildId, value) {
  await prisma.guildInfo.update({
    where: { guildId: guildId},
    data: { isCommonRoleEnabled: value },
  })
}

module.exports = {
  data: new SlashCommandBuilder() 
        .setName('toggle-common-role')
        .setDescription('Turn common role on and off')
        .setDefaultMemberPermissions(0)
        .setDMPermission(false)
        .addBooleanOption(option => 
          option.setName('value')
                .setDescription('On or Off')
                .setRequired(true)),
  async execute(interaction) {
    try {
      const value = interaction.options.getBoolean('value');
      await setCommonRoleDB(interaction.guildId, value);
      await interaction.reply({
        content: `> Common Role turned **${value ? 'On' : 'Off'}**`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
    } 
  }
}
