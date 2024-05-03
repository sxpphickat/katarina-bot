const { SlashCommandBuilder } = require('discord.js');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
  data: new SlashCommandBuilder()
        .setName('common-role')
        .setDescription('set the common role that the bot will give to any new members.')
        .addStringOption(option => 
          option.setName('role-name')
                .setDescription('common role name')
                .setRequired(true))
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),
  async execute(interaction) {

    try {
      const roleName = interaction.options.getString('role-name'); 
      const guildId = interaction.guildId;

      await prisma.guildInfo.update({
        where: { guildId: guildId },
        data: { commonRole: roleName },
      })

      let role = interaction.guild.roles.cache.find(role => role.name === roleName);
      if (!role) {
        role = await interaction.guild.roles.create({
          name: roleName,
          description: 'role of the commoners',
        })
        // .then(console.log)
      }
      await interaction.reply(`Common role setted to **${roleName}**, this role will be given to any new members.`);

      const botRole = interaction.guild.roles.cache.find(role => role.name === interaction.client.user.username);
      console.log(`bot role ${botRole}`);
      if (interaction.guild.roles.comparePositions(botRole, role) < 0) {
        await interaction.followUp(`> **[WARNING] role position is higher than bot's position!\n> Move the bot's position so that is higher than the common role's position\n> (Server Settings > Roles)**`)
      }
      await prisma.$disconnect();

    } catch (error) {
      console.error(`setCommonRole Error: ${error}`);
    }
  }
}

