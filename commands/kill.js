const discord = require('discord.js');
const config = require('../config.json')

module.exports = {
  name: "Kill",
  description: "Stops the Bot",
  usage: "!kill",
  execute: (bot, message, args) => {
    if (message.author.id !== config.ownerID) return message.channel.send("Can't use this!")
    process.exit()
  }
};