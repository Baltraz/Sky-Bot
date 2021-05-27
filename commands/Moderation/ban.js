const discord = require('discord.js');

module.exports = {
  name: "Ban",
  description: "Ban a Member from the Discord",
  usage: "!ban (Member) <Ban Reason>",
  perms: "Ban Members",
  execute: (bot, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR' || 'BAN_MEMBERS')) return message.channel.send("Not allowed to use this.")
    message.delete()
    const user = message.mentions.users.first();
    const banembed = new discord.MessageEmbed()
          .setTitle("✅ Banned User")
          .setColor("008000")
          .setDescription(`${user} has been banned.`)
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban()
          .then(() => {
            message.reply(banembed);
          })
          .catch(err => {
            message.reply('I was unable to ban the member');
            console.error(err);
          });
      } else {
        message.reply("The mentioned User isn't in the Discord.");
      }
    } else {
      message.reply("You didn't mention anyone to ban.");
    }
  }
};