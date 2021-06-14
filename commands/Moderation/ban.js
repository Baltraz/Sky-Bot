const Discord = require('discord.js');

module.exports = {
  name: "Ban",
  description: "Ban a Member from the Discord",
  usage: "ban (Member) <Ban Reason>\n\`Example: !ban 570267487393021969 Bad Dev\`",
  perms: "Ban Members",
  folder: "Moderation",
  execute: (client, message, args) => {
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You are missing the Permission \`BAN_MEMBERS\`.");
    if (!message.guild.me.hasPermission('BAN_MEMBERS'))return message.channel.send("I don\'t have \`BAN_MEMBERS\` Permission.");

    const user = message.mentions.users.first() || args[0];
    const reason = args.slice(1).join(" ");
    const banembed = new Discord.MessageEmbed()
          .setTitle("<a:yes:847468695772987423> Banned User")
          .setColor("008000")
          .setDescription(`${user} has been banned for **${reason}**.`)
    if (user) {
      const member = message.guild.member(user);
      if (args[0]) {
        message.guild.members
          .ban(user, {reason: `${reason}`})
          .then(() => {
            message.channel.send(banembed);
          })
          .catch(err => {
            message.channel.send('<a:no:847468672380829707> I was unable to ban the Member.');
            console.error(err);
          });
      }
    } else {
      message.channel.send("<a:wait:847471618272002059> You didn't mention a User or an ID to ban.");
    }
  }
};