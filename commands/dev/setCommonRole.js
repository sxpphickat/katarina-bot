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
                .setRequired(true)),
  async execute(interaction) {
    const roleName = interaction.options.getString('role-name'); 
    const guildId = interaction.guildId;

    // check if already exist for this guild if y just update the table.
    const guildRow = await prisma.commonUserRole.findUnique({
      where: {
        guildId: guildId
      }
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
    await interaction.reply(`Common role setted to ${roleName}, this role will be given to any new members.`);
    await prisma.$disconnect();
  }
}

