// @ts-check
const { REST, Routes } = require('discord.js'); 
require('dotenv').config();
const { BOT_TOKEN: token, CLIENT_ID: clientId, GUILD_ID: guildId } = process.env;
const fs = require('node:fs');
const path = require('node:path');




const commands = [];
const devCommands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFile = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFile) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      if (folder == 'dev') {
        devCommands.push(command.data.toJSON());
      } else {
        commands.push(command.data.toJSON());
      }
    } else {
      console.log(`[Warning] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(`Started refresing ${commands.length} application (/) commands.`);

    const data = await rest.put(
       Routes.applicationCommands(clientId),
      // use for global deploy
      { body: commands },
    );

    const dataDev = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      // Routes.applicationCommands(clientId),
      // use for global deploy
      { body: devCommands },
    );

    console.log(`Succesfully realoaded ${data.length} application (/) commands.`);
    console.log(`Succesfully realoaded ${dataDev.length} application (/) commands. [dev server]`);

  } catch (error) {
    console.log(error);
  }
})();
