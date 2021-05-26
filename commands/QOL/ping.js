const discord = require('discord.js');
const pms = require('pretty-ms')

module.exports = {
  name: "Ping",
  description: "Shows the BOT&API Ping and Bot Uptime!",
  usage: "!ping",
  execute: async (bot, message, args) => {
    message.delete();
    message.channel.send('Pinging . . .').then(m => {
      message.channel.send(
        new discord.MessageEmbed()
          .setTitle("🏓 Current Bot Downtime")
          .setColor('4169E1')
          .addFields(
            { name: "BOT Latency", value: `${m.createdTimestamp - message.createdTimestamp}ms.`, inline: false },
            { name: "API Latency", value: `${Math.round(bot.ws.ping)}ms.`, inline: false },
            { name: "Up-Time", value: `${pms(bot.uptime)}` }
          ));
    });
  }
};