const discord = require('discord.js');

module.exports = {
  name: "Invite",
  description: "Sends the Bots Invite Link",
  usage: "!invite",
  perms: "None",
  folder: "QOL",
    execute: (bot, message, args) => {
      message.delete()
      const embed = new discord.MessageEmbed()
      .setTitle('Important Bot Links')
      .setColor('fed8b1')
      .setDescription("[Support Server](https://discord.gg/Ca6XpTRQaR)\n[Bot Invite](https://discord.com/oauth2/authorize?client_id=839835292785704980&scope=bot&permissions=268758103)")
      message.channel.send(embed)
    }
};