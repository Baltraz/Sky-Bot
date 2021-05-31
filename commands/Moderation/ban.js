const discord = require('discord.js');

module.exports = {
  name: "Ban",
  description: "Ban a Member from the Discord",
  usage: "!ban (Member) <Ban Reason>",
  perms: "Ban Members",
  execute: (bot, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR' || 'BAN_MEMBERS')) return message.channel.send("Not allowed to use this.")
    message.delete()
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ");
    const banembed = new discord.MessageEmbed()
          .setTitle("✅ Banned User")
          .setColor("008000")
          .setDescription(`**${user}** has been banned for **${reason}**.`)
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({reason: reason})
          .then(() => {
            message.channel.send(banembed);
          })
          .catch(err => {
            message.channel.send('<a:no:847468672380829707> I was unable to ban the Member.');
            console.error(err);
          });
      } else {
        message.channel.send("The mentioned User isn't in the Discord.");
      }
    } else {
      message.channel.send("<a:wait:847471618272002059> You didn't mention anyone to ban.");
    }
  }
};