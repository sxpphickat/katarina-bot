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
    const roleName = interaction.options.getString('role-name'); 
    const guildId = interaction.guildId;

    // check if already exist for this guild if y just update the table.
    const guildRow = await prisma.commonUserRole.findUnique({
      where: { guildId: guildId }
    }); 
    // console.log(guildRow);
    if (!guildRow) {
      const res = await prisma.commonUserRole.create({
        data: {
          name: roleName,
          guildId: guildId,
        }
      })
      // console.log(res);
    } else {
      const res = await prisma.commonUserRole.update({
        where: { guildId: guildId },
        data: { name: roleName }
      })
      // console.log(res);
    }

    let role = interaction.guild.roles.cache.find(role => role.name === roleName);
    if (!role) {
      role = await interaction.guild.roles.create({
        name: roleName,
        description: 'role of the commoners',
      })
      .then(console.log)
      .catch(console.error);
    }
    await interaction.reply(`Common role setted to **${roleName}**, this role will be given to any new members.`);

    const botRole = interaction.guild.roles.cache.find(role => role.name === interaction.client.user.username);
    if (interaction.guild.roles.comparePositions(botRole, role) < 0) {
      await interaction.followUp(`> **[WARNING] role position is higher than bot's position!\n> Move the bot's position so that is higher than the common role's position\n> (Server Settings > Roles)**`)
    }
    await prisma.$disconnect();
  }
}

