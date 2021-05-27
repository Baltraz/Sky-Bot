const discord = require('discord.js');

module.exports = {
  name: "Purge",
  description: "Purge Messages",
  usage: "!purge (Message Amount)",
  perms: "Manage Messages",
    execute: (bot, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR' || 'MANAGE_MESSAGES')) return message.channel.send("Not allowed to use this.")
            if(!args[0]) return message.channel.send ('<a:wait:847471618272002059> Please define how many Messages should be deleted.')
            message.channel.bulkDelete(args[0]);
            message.channel.send(`<a:yes:847468695772987423> Succesfully deleted ${args[0]} Messages`)
    }
};