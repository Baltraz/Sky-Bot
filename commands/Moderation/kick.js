const discord = require('discord.js');

module.exports = {
  name: "Kick",
  description: "Kick a Member from the Discord",
  usage: "!kick (Member)",
  perms: "Kick Members",
  execute: (bot, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR' || 'KICK_MEMBERS')) return message.channel.send("Not allowed to use this.")
    message.delete()
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    const kickembed = new discord.MessageEmbed()
          .setTitle("✅ Kicked User")
          .setColor("008000")
          .setDescription(`${user} has been kicked.`)
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick()
          .then(() => {
            message.channel.send(kickembed);
          })
          .catch(err => {
            message.channel.send('<a:no:847468672380829707> I was unable to kick the Member.');
            console.error(err);
          });
      } else {
        message.channel.send("The mentioned User isn't in the Discord.");
      }
    } else {
      message.channel.send("<a:wait:847471618272002059> You didn't mention anyone to kick.");
    }
  }
};