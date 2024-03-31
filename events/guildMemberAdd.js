const { PrismaClient } = require('@prisma/client');
const { Events } = require('discord.js');


const prisma = new PrismaClient();

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const channel = member.guild.systemChannel;
    if (channel) {
      channel.send(`bem vindo ao server ${member}`)
             .then(console.log)
             .catch(console.error);
    }

    const guildSettings = await prisma.commonUserRole.findUnique({
      where: { guildId: member.guild.id }
    });
    if (!guildSettings) return console.error('Common role not set!');

    const role = member.guild.roles.cache.find(role => role.name === guildSettings.name);
    if (!role) return console.error("Role not found!"); 
    member.roles.add(role)
        .then(() => console.log(`Added role ${role.name} to ${member.user.tag}`))
        .catch(console.error);
  },
}
