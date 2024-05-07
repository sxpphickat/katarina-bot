const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
const { AsciiTable3, AlignmentEnum } = require('ascii-table3');
const { PrismaClient } = require('@prisma/client');
const { getManyPlayersEntries } = require('../../utils/riotApiCalls');
const { comparePlayers } = require('../../utils/compareRanking');
const { winrate } = require('../../utils/winrate');
const { tierColor } = require('../../utils/tierColor');
const { playerGames } = require('../../utils/playerGames');
const { createTable } = require('./leaderboard-utils/createTable');
const { createGuildInfo } = require('#utils/createGuildInfo.js');


module.exports = {
  data: new SlashCommandBuilder()
            .setName('leaderboard')
            .setDescription('show server ranking')
            .setDMPermission(false),
  async execute(interaction) {
    const prisma = require('#root/index.js');
    try {
      await interaction.deferReply();
      await createGuildInfo(interaction.guildId);

      const guildInfo = await prisma.guildInfo.findUnique({
        where: { guildId: interaction.guildId }
      });
      if (guildInfo.leaderboardPlayers.length === 0) {
        await interaction.editReply(`No players found! Use the **/add-player** command to add players`);
        return ;
      }
      const players = await prisma.player.findMany({
        where: { id: { in: guildInfo.leaderboardPlayers }}
      });

      const update = new ButtonBuilder()
            .setCustomId('update-leaderboard')
            .setLabel('Update')
            .setStyle(ButtonStyle.Primary)

      const row = new ActionRowBuilder()
            .addComponents(/* lastUpdate,  */update);

      const stringTable = await createTable(interaction, guildInfo, players);
       
      await interaction.editReply({
        content: `${stringTable}`,
        allowedMentions: { parse: [] },
        components: [row],
      })
    } catch (error) {
      console.error(error); 
    }
  }
}
