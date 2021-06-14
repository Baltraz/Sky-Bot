const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
  name: "Kill",
  description: "Shuts the Bot down. (Dev Only)",
  usage: "kill",
  perms: "Dev",
  folder: "Dev",
  execute: (client, message, args) => {
    if (message.author.id !== config.ownerID) return message.channel.send("Can't use this!")
    process.exit()
  }
};