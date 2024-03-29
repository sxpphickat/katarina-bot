const { Events, Colors } = require('discord.js');

// actions to do when the bot joins a server

module.exports = {
  name: Events.GuildCreate,
  async execute(guild) {
    const channel = guild.systemChannel;
    if (channel) {
      channel.send(`Noxus prevalecerá!`)
             .catch(err => console.error(err));
    }
    // let mommyRole = guild.roles.cache.find(role => role.name == 'Mommy');
    // const katRole = guild.roles.cache.find(role => role.name == guild.client.user.username);

    // const isHigher = katRole.comparePositionTo(mommyRole);

    // console.log(isHigher);
    // if (!mommyRole || isHigher < 0) {
    //     mommyRole = await guild.roles.create({
    //     name: 'Mommy',
    //     reason: 'Kataria mommmyyyyyy',
    //   })
    //     .catch(console.error);
    // }
    // const botMember = guild.members.cache.get(guild.client.user.id);
    // botMember.roles.add(mommyRole)
    //   .then(console.log)
    //   .catch(console.error);
  }
}
