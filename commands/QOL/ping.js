const discord = require('discord.js');
const pms = require('pretty-ms')

module.exports = {
  name: "Ping",
  description: "Shows the BOT&API Ping and Bot Uptime!",
  usage: "!ping",
  perms: "None",
  folder: "QOL",
  execute: async (bot, message, args) => {
    message.delete();
    const embed = new discord.MessageEmbed()
    .setDescription('Pinging . . .')
    message.channel.send(embed).then(m => {
      m.edit(
        new discord.MessageEmbed()
          .setTitle("Current Bot Info")
          .setColor('GREEN')
          .addFields(
            { name: "<:ping:847473419011620955> BOT Latency", value: `${m.createdTimestamp - message.createdTimestamp}ms.`, inline: false },
            { name: "<:ping:847473419011620955> API Latency", value: `${Math.round(bot.ws.ping)}ms.`, inline: false }
          ));
    });
  }
};