const discord = require('discord.js');

module.exports = {
  name: "Invite",
  description: "Sends the Bots Invite Link",
  usage: "!invite",
  perms: "None",
    execute: (bot, message, args) => {
      message.delete()
      message.channel.send("Use this Link to Invite me to your Server:\nhttps://discord.com/oauth2/authorize?client_id=839835292785704980&scope=bot&permissions=388167")}};