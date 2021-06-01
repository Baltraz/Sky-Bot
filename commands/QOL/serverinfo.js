const discord = require('discord.js');

module.exports = {
  name: "Serverstats",
  description: "Shows some Stats about the current Server.",
  usage: "!serverstats",
  perms: "None",
  folder: "QOL",
  execute: (bot, message, args) => {
    message.delete();
    message.channel.send(
      new discord.MessageEmbed()
        .setTitle("Server Stats")
        .setColor('00ff00')
        .addFields(
          { name: "Server Owner", value: `${message.guild.owner}`, inline: true },
          { name: "Server Name", value: `${message.guild.name}`, inline: true },
          { name: "Member Count", value: `${message.guild.memberCount}`, inline: true },
          { name: "Server Verification Level", value: `${message.guild.verificationLevel}`, inline: true },
          { name: "Server Created On", value: `${message.guild.createdAt}`, inline: true }))
  }
};