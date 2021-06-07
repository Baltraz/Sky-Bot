const discord = require('discord.js');

module.exports = {
  name: "Changelog",
  description: "Shows the Bots Changes/Updates",
  usage: "!changelog",
  perms: "None",
  folder: "Config",
    execute: (client, message, args) => {
      message.delete()
      const cembed = new discord.MessageEmbed()
      .setTitle('Sky Bot Changelog')
      .setDescription('Version 1.0.1 Changelog\n\nAdded **!bean** and **!rat** for Fun Commands.\n\n**!verify** has been added checking for your Catacombs level and setting your nick as needed.\n\n**!setup** has been added for very easy Bot Setup.\n\n**Sneak Peak on upcoming Features**\n\nAdding some Hypixel Skyblock Commands now like Weight checking Skills checking etc.')
      
      message.channel.send(cembed)
    }
};