const discord = require('discord.js');

module.exports = {
  name: "Bean",
  description: "<:beans:849265485199048744>",
  usage: "!bean (Member)",
  perms: "<:beans:849265485199048744>",
  folder: "Fun",
  execute: (bot, message, args) => {
    message.delete()
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    const ratembed = new discord.MessageEmbed()
      .setTitle("<:beans:849265485199048744> Beaned User <:beans:849265485199048744>")
      .setColor("964B00")
      .setDescription(`<:beans:849265485199048744> ${user} has bean **BEANED**! <:beans:849265485199048744>`)

    message.channel.send(ratembed);
  }
};