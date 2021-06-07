const Discord = require('discord.js');

module.exports = {
  name: "Userinfo",
  description: "Shows some Info about the User.",
  usage: "!userinfo",
  perms: "None",
  folder: "QOL",
  execute: (client, message, args) => {
    message.delete();
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("User Info")
        .setColor('00ff00')
        .addFields(
          { name: "User", value: `${message.author}`, inline: true },
          { name: "User ID", value: `${message.author.id}`, inline: true },
          { name: "Server Join Date", value: `${message.member.joinedAt}`, inline: true })
        .setThumbnail(message.author.displayAvatarURL()))
  }
};