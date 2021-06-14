const Discord = require('discord.js');

module.exports = {
  name: "Unban",
  description: "Unban a Member from the Discord",
  usage: "unban (Member ID)\n\`Example: !unban 570267487393021969\`",
  perms: "Ban Members",
  folder: "Moderation",
  execute: (client, message, args) => {
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You are missing the Permission \`BAN_MEMBERS\`.");
    if (!message.guild.me.hasPermission('BAN_MEMBERS'))return message.channel.send("I don\'t have \`BAN_MEMBERS\` Permission.");



    const user = args[0];

    const unban = new Discord.MessageEmbed()
          .setTitle("<a:yes:847468695772987423> Unbanned User")
          .setColor("008000")
          .setDescription(`<@${user}> has been unbanned.`)
    if (user) {
      const member = message.guild.member(user);
      if (args[0]) {
        message.guild.members
          .unban(user)
          .then(() => {
            message.channel.send(unban);
          })
          .catch(err => {
            message.channel.send('<a:no:847468672380829707> I was unable to unban the Member.');
            console.error(err);
          });
      }
    } else {
      message.channel.send("<a:wait:847471618272002059> You didn't send an Member ID to unban.");
    }
  }
};