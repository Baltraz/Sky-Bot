const Discord = require('discord.js');
const prefix = require('discord-prefix');
const config = require('../../config.json');

module.exports = {
  name: "Setprefix",
  description: "Set the Server Prefix",
  usage: "!prefix (Prefix)",
  perms: "Admin",
  folder: "Config",
    execute: (client, message, args) => {
      if (message.author.id !== config.ownerID) return message.channel.send('Feature not released yet :D will happen soon')

       //   if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You are missing the Permission \`ADMINISTRATOR\`.");

      const id = message.guild.id;
      if(args[0] === undefined) {
        message.channel.send(`This Servers Prefix is \`${prefix.getPrefix(id)}\`\nUse \`!setprefix (Prefix)\` to set a new Prefix.`)
        return;
      }

prefix.setPrefix(`${args[0]}`, `${id}`);
message.channel.send(`Prefix has been set to \`${prefix.getPrefix(id)}\`.`)
    }
};