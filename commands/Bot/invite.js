const Discord = require('discord.js');

module.exports = {
  name: "Invite",
  description: "Sends the Bots Invite Link",
  usage: "invite",
  perms: "None",
  folder: "Bot",
    execute: (client, message, args) => {

      const embed = new Discord.MessageEmbed()
      .setTitle('Important Bot Links')
      .setColor('fed8b1')
      .setDescription("[Support Server](https://discord.gg/Ca6XpTRQaR)\n[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=839835292785704980&permissions=402975831&scope=applications.commands%20bot)")
      message.channel.send(embed)
    }
};