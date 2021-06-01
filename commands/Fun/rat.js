const discord = require('discord.js');

module.exports = {
  name: "Rat",
  description: "🐀",
  usage: "!rat (Member)",
  perms: "🐀",
  folder: "Fun",
  execute: (bot, message, args) => {
    message.delete()
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    const ratembed = new discord.MessageEmbed()
      .setTitle("🐀 Ratted User")
      .setColor("GREY")
      .setDescription(`🐀 ${user} is a Rat!`)

    message.channel.send(ratembed);
  }
};