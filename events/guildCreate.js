const { Events, Colors } = require('discord.js');
const { PrismaClient } = require('@prisma/client');

// actions to do when the bot joins a server


const prisma = new PrismaClient();

module.exports = {
  name: Events.GuildCreate,
  async execute(guild) {
    try {
      const channel = guild.systemChannel;
      if (channel) {
        await channel.send(`Noxus prevalecerá!`)
      }
      const guildHasBot = await prisma.guildInfo.findUnique({
        where: { guildId: guild.id }
      })

      if (guildHasBot) { return ; }
      const guildInfo = await prisma.GuildInfo.create({
        data: {
          guildId: guild.id, 
        }
      });
    } catch (e) {
      console.error(`guild create Error: ${e}`);
    }
  }
}
