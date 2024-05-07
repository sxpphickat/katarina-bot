const { Events, Colors } = require('discord.js');
const { PrismaClient } = require('@prisma/client');
const { createGuildInfo } = require('../utils/createGuildInfo');

// actions to do when the bot joins a server


const prisma = require('#root/index.js');

module.exports = {
  name: Events.GuildCreate,
  async execute(guild) {
    try {
      const channel = guild.systemChannel;
      if (channel) {
        await channel.send(`Noxus prevalecerá!`)
      }
      await createGuildInfo(guild.id); 
    } catch (e) {
      console.error(`guild create Error: ${e}`);
    }
  }
}
