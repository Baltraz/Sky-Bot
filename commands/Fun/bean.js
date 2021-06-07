const Discord = require('discord.js');

module.exports = {
  name: "Bean",
  description: "<:beans:849265485199048744>",
  usage: "!bean (Member)",
  perms: "<:beans:849265485199048744>",
  folder: "Fun",
  execute: (client, message, args) => {

    message.delete()

    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    
    const beanembed = new Discord.MessageEmbed()
      .setTitle("<:beans:849265485199048744> Beaned User <:beans:849265485199048744>")
      .setColor("964B00")
      .setDescription(`<:beans:849265485199048744> ${user} has bean **BEANED**! <:beans:849265485199048744>`)
      .setFooter(`Used by ${message.author.tag}`)

    if (user) {
      message.channel.send(beanembed)
    } else {
      message.channel.send("<a:wait:847471618272002059> You didn't mention anyone to bean.")
    }

  }
};