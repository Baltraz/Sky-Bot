const Discord = require('discord.js');

module.exports = {
  name: "Kick",
  description: "Kick a Member from the Discord",
  usage: "!kick (Member)\n\`Example: !kick 570267487393021969\`",
  perms: "Kick Members",
  folder: "Moderation",
  execute: (client, message, args) => {
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You are missing the Permission \`KICK_MEMBERS\`.");
    if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send("I don\'t have \`KICK_MEMBERS\` Permission.");

    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    const kickembed = new Discord.MessageEmbed()
          .setTitle("<a:yes:847468695772987423> Kicked User")
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
        message.channel.send("<a:no:847468672380829707> The mentioned User isn't in the Discord.");
      }
    } else {
      message.channel.send("<a:wait:847471618272002059> You didn't mention anyone to kick.");
    }
  }
};