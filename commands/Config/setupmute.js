const Discord = require('discord.js');
const config = require('../../config.json')
let editedchannels = 0;
module.exports = {
  name: "Setupmute",
  description: "Sets the Permissions for all Channels for the Muted role",
  usage: "!setupmute",
  perms: "Manage Channels",
  folder: "Config",
  execute: (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("You are missing the Permission \`MANAGE_CHANNELS\`.");
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS'))return message.channel.send("I don\'t have \`MANAGE_CHANNELS\` Permission.");

    const muteRole = message.guild.roles.cache.find(
      role => role.name === 'Muted'
    );

    message.guild.channels.cache.forEach(ch => {
      if (ch.type == "text")
        ch.createOverwrite(muteRole.id,
          {
              'SEND_MESSAGES': false,
              'EMBED_LINKS': false,
              'ATTACH_FILES': false,
              'ADD_REACTIONS': false,
          },'Automatic permissions Setup.')
          editedchannels += 1;
    })
    message.channel.send(`Permissions for Muted Role Setup!\n\`${editedchannels}\` Channels have been edited.`)

  }
};