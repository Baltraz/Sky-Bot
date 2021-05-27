const discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
  name: "Kill",
  description: "Shuts the Bot down. (Baltraz Only)",
  usage: "!kill",
  perms: "BotOwner",
  execute: (bot, message, args) => {
    if (message.author.id !== config.ownerID) return message.channel.send("Can't use this!")
    process.exit()
  }
};