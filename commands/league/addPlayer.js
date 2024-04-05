const { PrismaClient } = require('@prisma/client');
const { SlashCommandBuilder } = require('discord.js');
const { getAccount, getSummoner } = require('../../utils/riotApiCalls');

const prisma = new PrismaClient;

module.exports = {
  data: new SlashCommandBuilder()
        .setName('add-player')
        .setDescription('add a player to the player list.')
        .setDMPermission(false)
        .addStringOption(option => 
          option.setName('game-name')
                .setDescription('Game Name + #tag')
                .setMaxLength(22)
                .setRequired(true))
        .addStringOption(option =>
          option.setName('server')
                .setDescription('Select your server, default is BR1')
                .addChoices(
                    { name: 'BR1' , value: 'BR1'}, 
                    { name: 'EUN1', value:'EUN1'},    
                    { name: 'EUW1', value:'EUW1'},
                    { name: 'JP1' , value: 'JP1'},
                    { name: 'KR'  , value: 'KR' },
                    { name: 'LA1' , value: 'LA1'},
                    { name: 'LA2' , value: 'LA2'},
                    { name: 'NA1' , value: 'NA1'},
                    { name: 'OC1' , value: 'OC1'},
                    { name: 'TR1' , value: 'TR1'},
                    { name: 'RU'  , value: 'RU' },
                    { name: 'PH2' , value: 'PH2'},
                    { name: 'SG2' , value: 'SG2'},
                    { name: 'TH2' , value: 'TH2'},
                    { name: 'TW2' , value: 'TW2'},
                    { name: 'VN2' , value: 'VN2'}
    )),
  async execute(interaction) {

    const gameName = interaction.options.getString('game-name');
    const server = interaction.options.getString('server') ?? 'BR1';
    const regexPattern = /((.{3,16})(#)(.{3,5}))$/

    if (!regexPattern.test(gameName) || gameName.split('#').length - 1 != 1) {
      await interaction.reply({
        content: `> **invalid Riot Id, follow the pattern GameName#TAG**`,
        ephemeral: true, })
      return ;
    }
    await interaction.deferReply({ephemeral: true});

    const riotAccount = await getAccount(...gameName.split('#'))
      .catch(async error => {
        switch (error.message) {
          case 'Player not found':
            await interaction.editReply({content: `> Player **${gameName}** not found`, ephemeral: true});
            break;
          default:
            await interaction.editReply({ content: '> **Unexpected error! please contact the developers! [account]**', ephemeral: true}); 
            break;
        }
    });

    if (!riotAccount) return ;

    const summoner = await getSummoner(riotAccount.puuid, server)
      .catch(async () => {
        await interaction.editReply({ content: '> **Unexpected error! please contact the developers! [summoner]**' });
      });

    if (!summoner) return ;

    const data = {
      gameName: riotAccount.gameName,
      tagLine: riotAccount.tagLine,
      summonerId: summoner.id,
      server: server,
    };

    const player = await prisma.Player.upsert({
      where: { playerId: riotAccount.puuid },
      update: data,
      create: { ...data, playerId:riotAccount.puuid },
    });

    const existingLeaderboard = await prisma.leaderboard.findUnique({
      where: { guildId: interaction.guildId },
    })

    const playersArray = existingLeaderboard ? JSON.parse(existingLeaderboard.playersArray) : [];
    if (!playersArray.includes(player.id)) {
      playersArray.push(player.id);
    }

    const leaderboard = await prisma.leaderboard.upsert({
      where: { guildId: interaction.guildId },
      update: {
        playersArray: JSON.stringify(playersArray)  
      },
      create: {
        guildId: interaction.guildId,
        playersArray: JSON.stringify(playersArray),
        lastUpdate: new Date(),
      }
    })


    // console.log({leaderboard});
    // console.log({player});
    // const players = await prisma.Player.findMany();
    // console.log({players});
    await interaction.editReply(`> Player **${gameName}** added!`);
  }
}
