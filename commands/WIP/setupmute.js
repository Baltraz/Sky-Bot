const Discord = require('discord.js');
const config = require('../../config.json')
module.exports = {
  name: "Setupmute",
  description: "Sets the Permissions for all Channels for the Muted role",
  usage: "!setupmute",
  perms: "Dev Only",
  folder: "Config",
  execute: (client, message, args) => {
if (message.author.id !== config.ownerID) return message.channel.send("Can't use this!")

    const muteRole = message.guild.roles.cache.find(
      role => role.name === 'Muted'
    );

    message.guild.channels.cache.forEach(ch => {
      if (ch.type == "text")
        ch.overwritePermissions([
          {
            id: muteRole.id,
            deny: ['SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']

          },
        ], 'Permissions for the Muted role set!');
    })
  }
};