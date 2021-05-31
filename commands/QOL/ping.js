const discord = require('discord.js');
const pms = require('pretty-ms')

module.exports = {
  name: "Ping",
  description: "Shows the BOT&API Ping and Bot Uptime!",
  usage: "!ping",
  perms: "None",
  execute: async (bot, message, args) => {
    message.delete();
    message.channel.send('Pinging . . .').then(m => {
      message.channel.send(
        new discord.MessageEmbed()
          .setTitle("Current Bot Info")
          .setColor('4169E1')
          .addFields(
            { name: "<:ping:847473419011620955> BOT Latency", value: `${m.createdTimestamp - message.createdTimestamp}ms.`, inline: false },
            { name: "<:ping:847473419011620955> API Latency", value: `${Math.round(bot.ws.ping)}ms.`, inline: false }
          ));
    });
  }
};