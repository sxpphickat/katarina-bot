const { PrismaClient } = require("@prisma/client");
const { getOnePlayerEntries } = require("../../../utils/riotApiCalls");
const { createTable } = require("./createTable");

const prisma = require('#root/index.js');

async function updateEntries(interaction) {
  try {
    const guildInfo = await prisma.GuildInfo.update({
      where: { guildId: interaction.guildId },
      data: { lastUpdate: new Date()},
    });

    const players = await prisma.Player.findMany({
      where: { id: { in: guildInfo.leaderboardPlayers }}
    });

    players.map(async player => {
      const entries = await getOnePlayerEntries(player); 
      await prisma.Player.update({
        where: { id: player.id},
        data: { 
          entries: entries,
        },
      });
    });

    const updatedPlayers = await prisma.Player.findMany({
      where: { id: { in: guildInfo.leaderboardPlayers }}
    });
 
    return [guildInfo, updatedPlayers];
  } catch (error) {
    console.log(error);
  }
}

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function updateLeaderboard(interaction) {
  const { lastUpdate } = await prisma.guildInfo.findUnique({
    where: { guildId: interaction.guildId },
    select: { lastUpdate: true },
  })


  const elapsedTime = Date.now() - lastUpdate; 

  if (elapsedTime < 60_000) {
    await interaction.reply({
      content: 'Last update was less than 1 minutes ago !!',
      ephemeral: true,
    })
    .then(msg => {
      setTimeout(() => msg.delete(), 10_000);
    })
    .catch(console.error);
    return ;
  }

  await interaction.update('https://media.tenor.com/LvThoInfEAcAAAAi/katarina.gif');
  const [guildInfo, players] = await updateEntries(interaction);

  const table = await createTable(interaction, guildInfo, players);
  await interaction.message.edit(table);
  await interaction.message.reply('Leaderboard Updated !! O_o')
  .then(msg => {
    setTimeout(() => msg.delete(), 5_000);
  });
}


module.exports = { updateLeaderboard };
