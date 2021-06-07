const discord = require('discord.js');
const pms = require('pretty-ms')
const osu = require('node-os-utils');
module.exports = {
  name: "Info",
  description: "Shows some Info about the Bot",
  usage: "!info",
  perms: "None",
  folder: "QOL",
    execute: (client, message, args) => {
      message.delete();
      const infoembed = new discord.MessageEmbed()
      .setTitle("Bot Info")
      .setColor("BLUE")
      .setDescription("Various Information about the Bot")
      .addFields(
        {name: "<:verifieddev:848830303472189461> Bot Dev", value: "Baltraz#4874 [570267487393021969]"},
        {name: "<:contributor:849605979589967922> Contributors", value:"firebxll, Delta, Mend"},
        {name: "<:verifiedbot:848830315890737172> Bot Version", value: "1.0.1"},
        {name: "<:support:848831144509177866> Support Server", value: "[Discord Support Server](https://discord.gg/Ca6XpTRQaR)"},
        {name: "<:uptime:847474288884842567> Bot Uptime", value: `${pms(client.uptime)}`},
        {name: "ℹ️ Total Server Count", value:`${client.guilds.cache.size}`},
        {name: "ℹ️ Total User Count", value: `${client.users.cache.size}`})
        message.channel.send(infoembed)
    }
};