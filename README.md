

_Katarina bot isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc._



> [!Table of Contents]
> 
>  - [Install](#Install)
>  - [Features](#Features)
> 	 - [Discord management features](#Discord%20management%20features)
> 	 - [League](#League)


## Install
**setup .env first!**

```bash
node i
#or
bun i
#or equivalent
```
### scripts
**Note**: scripts uses `node` runtime by default, change it if you want to.

`npm run deploy`
to deploy the commands to the bot, commands on the folder 'dev' will only be deployed to the server specified on .env GUILD_ID, commands on others folders will be deployed to all servers. 

`npm run server`
starts the bot on foreground 

`npm run deamon`
**Note**: You will need to install the "forever" package locally or globally manually, I didn't include on the dependencies since It gives some security warnings

starts the server as a deamon (background)

`npm run deamon-stop`
stops the deamon. 

### .env 

 **setup the .env according to .env-example**

`BOT_TOKEN` - refers to the bot's token given by discord when you create a bot

`CLIENT_ID` - refers to the Id of the bot

`GUILD_ID` - refers to the guild (server) used for development.

`RIOT_TOKEN`- refers to the token given by riot to use riot api.

`DATABASE_URL` - path to the database, since its sqlite, its just a path to a file. eg.

`DATABASE_URL="file:/home/kat/katarina-bot-db/server.db"`

## Features
### Discord management features
#### Commands

- `/common-role` -  set a "common role", this role will be given to any new members of the server, if the role doesn't exist it will create. If the role already exists make sure that the bot role is higher then it on `Server Settings > Roles`

#### Events

- New member - When a new member joins the server, it will greet the member and add the "common role" to it.


### League
#### Commands
- `/add-player` - adds a new player to the server leaderboard.
	**It takes 2 options**: a required "`game-name`" and an optional "`server`", with "`BR1`" as the default if not provided.

- `/remove-player` - removes a player from the leaderboard.

- `/dance` - Katarina-dancing.gif
	![katarina](katarina.gif)

- `/leaderboard` - shows the server leaderboard, e.g.
	![leaderboard](leaderboard.png)



`O_o`