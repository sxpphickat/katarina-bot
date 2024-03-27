const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildMemberAdd,
  execute(member) {
    const channel = member.guild.systemChannel;
    if (channel) {
      channel.send(`bem vindo ao server ${member}`)
             .catch(error => console.log(error));
    }

    const role = member.guild.roles.cache.find(role => role.name === 'randoms');
    if (!role) return console.error("Role not found!"); 
    member.roles.add(role)
        .then(() => console.log(`Added role ${role.name} to ${member.user.tag}`))
        .catch(console.error);

  },
}
