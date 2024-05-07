


async function createGuildInfo(guildId) {
  const prisma = require('#root/index.js');
  const guildHasBot = await prisma.guildInfo.findUnique({
    where: { guildId: guildId }
  })

  if (guildHasBot) { return ; }
  const guildInfo = await prisma.GuildInfo.create({
    data: {
      guildId: guildId, 
    }
  });
} 

module.exports = { createGuildInfo };

