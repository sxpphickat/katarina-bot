const { PrismaClient } = require('@prisma/client');
const { SlashCommandBuilder } = require('discord.js');

const prisma = new PrismaClient();

module.exports = {
  data: new SlashCommandBuilder()
        .setName('remove-player')
        .setDescription('Remove a player from leaderboard')
        .addStringOption(option => 
          option.setName('game-name')
                .setDescription('Player to remove')
                .setMaxLength(22)
                .setAutocomplete(true)
                .setRequired(true)),
                
  async autocomplete(interation) {
    const guild = await prisma.leaderboard.findUnique({
      where: { guildId: interation.guildId }
    });
    
    if (!guild) return ;

    const serverPlayerList = JSON.parse(guild.playersArray);

    const players = await prisma.player.findMany({
      where: { id: { in: serverPlayerList } },
    });

    const playerChoises = players.map(player => `${player.gameName}#${player.tagLine}`);

    const focusedValue = interation.options.getFocused().toLowerCase();

    const filtered = playerChoises.filter(player => player.toLowerCase().startsWith(focusedValue));

    await interation.respond(
      filtered.map(choise => ({name: choise, value: choise }))
    );
  },

  async execute(interation) {
    await interation.deferReply({ ephemeral: true });
    const gameName = await interation.options.getString('game-name');
    const regexPattern = /((.{3,16})(#)(.{3,5}))$/
    if (!regexPattern.test(gameName) || gameName.split('#').length - 1 != 1) {
      await interation.editReply('Invaid player!');
      return ;
    }
    const [name, tag] = gameName.split('#');
    const playerToDelete = await prisma.player.findFirst({
      where: {
        gameName: name,
        tagLine: tag
      }
    });
    if (!playerToDelete) {
      await interation.editReply(`Player **${gameName}** not found!`);
      return ;
    }
    await prisma.player.delete({
      where: { id: playerToDelete.id }
    })
      .catch(async () => {
      await interation.editReply(`Player **${gameName}** not found!`);
      return ;
    });
    await interation.editReply(`Player **${gameName}** deleted successfully!`);
  }
}
