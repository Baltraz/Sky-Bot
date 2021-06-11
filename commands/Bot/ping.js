const Discord = require('discord.js');
const pms = require('pretty-ms')

module.exports = {
  name: "Ping",
  description: "Shows the BOT&API Ping and Bot Uptime!",
  usage: "!ping",
  perms: "None",
  folder: "Bot",
  execute: async (client, message, args) => {

    const embed = new Discord.MessageEmbed()
      .setDescription('Pinging . . .')
    message.channel.send(embed).then(m => {
      m.edit(
        new Discord.MessageEmbed()
          .setTitle("Current Bot Info")
          .setColor('GREEN')
          .addFields(
            { name: "<:ping:847473419011620955> BOT Latency", value: `${m.createdTimestamp - message.createdTimestamp}ms.`, inline: false },
            { name: "<:ping:847473419011620955> API Latency", value: `${Math.round(client.ws.ping)}ms.`, inline: false }
          ));
    });
  }
};