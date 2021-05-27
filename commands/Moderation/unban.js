const discord = require('discord.js');

module.exports = {
  name: "Unban",
  description: "Unban a Member from the Discord",
  usage: "!unban (Member)",
  perms: "Ban Members",
  execute: (bot, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR' || 'BAN_MEMBERS')) return message.channel.send("Not allowed to use this.")
    message.delete()
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    const unbanembed = new discord.MessageEmbed()
          .setTitle("✅ Unbanned User")
          .setColor("008000")
          .setDescription(`${user} has been unbanned.`)
    if (user) {
      const user = message.content.slice(args[0]).trim().split(' ')
      if (user) {
        user
          .unban(args[0])
          .then(() => {
            message.channel.send(unbanembed);
          })
          .catch(err => {
            message.channel.send('<a:no:847468672380829707> I was unable to unban the Member.');
            console.error(err);
          });
      } else {
        message.channel.send("The mentioned User isn't in the Discord.");
      }
    } else {
      message.channel.send("<a:wait:847471618272002059> You didn't mention anyone to unban.");
    }
  }
};