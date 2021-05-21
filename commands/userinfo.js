const discord = require('discord.js');

module.exports = {
    execute: (bot, message, args) => {
      message.delete();
      message.channel.send(
      new discord.MessageEmbed()
        .setTitle("User Info")
        .setColor('00ff00')
        .addFields(
          {name: "User", value: `${message.author}`, inline: true},
          {name: "User ID", value: `${message.author.id}`, inline: true},)
        .setFooter("Made by Baltraz#4874")
        .setThumbnail(message.author.displayAvatarURL()))
    }
};