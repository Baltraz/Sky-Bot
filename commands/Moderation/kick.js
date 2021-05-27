const discord = require('discord.js');

module.exports = {
  name: "Kick",
  description: "Kick a Member from the Discord",
  usage: "!kick (Member) <Kick Reason>",
  perms: "Kick Members",
  execute: (bot, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR' || 'KICK_MEMBERS')) return message.channel.send("Not allowed to use this.")
    message.delete()
    const user = message.mentions.users.first()
    const kickembed = new discord.MessageEmbed()
          .setTitle("✅ Kicked User")
          .setColor("008000")
          .setDescription(`${user} has been kicked.`)
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick('')
          .then(() => {
            message.reply(kickembed);
          })
          .catch(err => {
            message.reply('I was unable to kick the member');
            console.error(err);
          });
      } else {
        message.reply("The mentioned User isn't in the Discord.");
      }
    } else {
      message.reply("You didn't mention anyone to kick.");
    }
  }
};