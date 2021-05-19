const discord = require('discord.js');

module.exports = {
    execute: async (bot, message, args) => {
      message.delete();
    message.channel.send('Pinging . . .').then(m => {
    message.channel.send(
      new discord.MessageEmbed()
        .setTitle("Pinged Latency's")
       // .setDescription("Current Ping")
        .setColor('4169E1')
        .addFields(
          {name: "🏓Latency", value: `${m.createdTimestamp - message.createdTimestamp}ms.`, inline: false},
          {name: "API Latency", value: `${Math.round(bot.ws.ping)}ms.`, inline: false}));
  });
}};