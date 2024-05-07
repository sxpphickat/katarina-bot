const { PrismaClient } = require('@prisma/client');
const { Events } = require('discord.js');


const prisma = require('#root/index.js');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    try {
      const guildInfo= await prisma.guildInfo.findUnique({
        where: { guildId: member.guild.id }
      });

      if (!guildInfo) { throw new Error('Guild info not found'); }      
      if (guildInfo.isGreetingEnabled) {
        const channel = member.guild.systemChannel;
        if (channel) {
          await channel.send(`bem vindo ao server ${member}`)
                 // .then(console.log)
        }
      }
      
      if (guildInfo.isCommonRoleEnabled) {
        const role = member.guild.roles.cache.find(role => role.name === guildInfo.commonRole);
        if (!role) return console.error("Role not found!"); 
        await member.roles.add(role)
            .then(() => console.log(`Added role ${role.name} to ${member.user.tag}`))

      }

    } catch (e) {
      console.error(`guildMemmberAdd Error: ${e}`);
    }

  },
}
