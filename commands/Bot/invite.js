const Discord = require('discord.js');

module.exports = {
  name: "Invite",
  description: "Sends the Bots Invite Link",
  usage: "!invite",
  perms: "None",
  folder: "Bot",
    execute: (client, message, args) => {
      message.delete()
      const embed = new Discord.MessageEmbed()
      .setTitle('Important Bot Links')
      .setColor('fed8b1')
      .setDescription("[Support Server](https://discord.gg/Ca6XpTRQaR)\n[Bot Invite](https://discord.com/oauth2/authorize?client_id=839835292785704980&scope=bot&permissions=402975831)")
      message.channel.send(embed)
    }
};