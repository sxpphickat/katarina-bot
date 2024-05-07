const { PrismaClient } = require('@prisma/client');
const { SlashCommandBuilder } = require('discord.js');
const { createGuildInfo } = require('../../utils/createGuildInfo');


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
                
  async autocomplete(interaction) {
    const prisma = require('#root/index.js');
    const guildInfo = await prisma.guildInfo.findUnique({
      where: { guildId: interaction.guildId }
    });
    
    if (!guildInfo) return ;

    const leaderboardPlayers = guildInfo.leaderboardPlayers;

    const players = await prisma.player.findMany({
      where: { id: { in: leaderboardPlayers } },
    });

    const playerChoises = players.map(player => `${player.gameName}#${player.tagLine}`);

    const focusedValue = interaction.options.getFocused().toLowerCase();

    const filtered = playerChoises.filter(player => player.toLowerCase().startsWith(focusedValue));

    await interaction.respond(
      filtered.map(choise => ({name: choise, value: choise }))
    );
  },

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const prisma = require('#root/index.js');

    await createGuildInfo(interaction.guildId);
    const gameName = await interaction.options.getString('game-name');
    const regexPattern = /((.{3,16})(#)(.{3,5}))$/
    if (!regexPattern.test(gameName) || gameName.split('#').length - 1 != 1) {
      await interaction.editReply('Invaid player!');
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
      await interaction.editReply(`Player **${gameName}** not found!`);
      return ;
    }

    const guildInfo = await prisma.guildInfo.findUnique({
      where: { guildId: interaction.guildId },
    })
      .catch(console.error);
    
    const deleteIndex = guildInfo.leaderboardPlayers.indexOf(playerToDelete.id);

    const updatedLeaderboardPlayers = guildInfo.leaderboardPlayers;
    updatedLeaderboardPlayers.splice(deleteIndex, 1);

    const updatedGuildInfo = await prisma.guildInfo.update({
      where: { guildId: interaction.guildId },
      data: {
        leaderboardPlayers: updatedLeaderboardPlayers,
      }
    })
      .catch(console.error);

    await interaction.editReply(`Player **${gameName}** deleted successfully!`);
  }
}
