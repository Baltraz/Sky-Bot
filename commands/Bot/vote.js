const Discord = require('discord.js');
module.exports = {
  name: "vote",
  description: "Shows the Upvote Links for Sky Bot",
  usage: "vote",
  perms: "None",
  folder: "Bot",
  execute: (client, message, args) => {
    const vembed = new Discord.MessageEmbed()
      .setTitle('Sky Bot Voting')
      .setColor('GREEN')
      .setDescription('**Bot Vote Links:**\n[1. Vote Link](https://discordbotlist.com/bots/sky-bot-2462)\n[2. Vote Link](https://discordextremelist.xyz/de-DE/bots/839835292785704980)\n[3. Vote Link](https://discord-botlist.eu/bots/839835292785704980)\n[4. Vote Link(not working yet)](https://top.gg/bot/839835292785704980)\n\n**Server Vote Links:**\n[1. Vote Link](https://discordbotlist.com/servers/sky-bot-support)\n[2. Vote Link](https://top.gg/servers/847451487775752202)')

    message.channel.send(vembed)
  }
};