const { PrismaClient } = require('@prisma/client');
const { SlashCommandBuilder } = require('discord.js');
const { getAccount } = require('../../utils/riotApiCalls');

const prisma = new PrismaClient;

module.exports = {
  data: new SlashCommandBuilder()
        .setName('add-player')
        .setDescription('add a player to the player list.')
        .addStringOption(option => 
          option.setName('game-name')
                .setDescription('Game Name + #tag')
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

    if (!regexPattern.test(gameName)) {
      await interaction.reply({
        content: `> **invalid Riot Id, follow the pattern GameName#TAG**`,
        ephemeral: true, })
      return ;
    }
    await interaction.deferReply();

    const [name, tag] = gameName.split('#'); 

    const riotAccount = await getAccount(...gameName.split('#'))
      .catch(async error => {
        switch (error.message) {
          case 'Player not found':
            await interaction.deferReply({content: `> **Player ${gameName} not found**`, ephemeral: true});
            return ;
          default:
            await interaction.deferReply({ content: '> **Unexpected error! please contact the developers!**', ephemeral: true}); 
            return ;
        }
    });

    await interaction.editReply(`> **Player ${gameName} added!**`);
  }
}


//server opcional defalt br
