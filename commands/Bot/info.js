const Discord = require('discord.js');
const pms = require('pretty-ms');
const prefix = require('discord-prefix');

module.exports = {
  name: "Info",
  description: "Shows some Info about the Bot",
  usage: "!info",
  perms: "None",
  folder: "Bot",
  execute: (client, message, args) => {
    const id = message.guild.id;
    let gprefix = prefix.getPrefix(id);
    if(gprefix === null) {
      gprefix = '!';
    }

    const infoembed = new Discord.MessageEmbed()
      .setTitle("Bot Info")
      .setColor("BLUE")
      .setDescription("Various Information about the Bot")
      .addFields(
        { name: "<:verifieddev:848830303472189461> Bot Dev", value: "Baltraz#4874 [570267487393021969]", inline: true },
        { name: "<:contributor:849605979589967922> Contributors", value: "Hima, firebxll, Delta, Mend", inline: true },
        { name: "<:verifiedbot:848830315890737172> Bot Version", value: "1.1.0", inline: true },
        { name: "<:support:848831144509177866> Support Server", value: "[Discord Support Server](https://discord.gg/Ca6XpTRQaR)", inline: true },
        { name: "ℹ️ Total Server Count", value: `${client.guilds.cache.size}`, inline: true },
        { name: "ℹ️ Total User Count", value: `${client.users.cache.size}`, inline: true },
        { name: "<:uptime:847474288884842567> Bot Uptime", value: `${pms(client.uptime)}`, inline: true },
        { name: "Prefix", value: `${gprefix}`, inline: true },
        { name: "Command Count", value: '\`33\`', inline: true },
        { name: "Event Count", value: '\`2\`', inline: true })
    message.channel.send(infoembed)
  }
};