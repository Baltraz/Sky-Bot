const discord = require('discord.js');

module.exports = {
  name: "Kick",
  description: "Ban a Member from the Discord",
  usage: "!ban (Member) <Ban Reason>",
  execute: (bot, message, args) => {
    const { member, mentions } = message
    const tag = `<@${member.id}>`
    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('Kick')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`<@${target.id}>, has been kicked.`)

      } else {
        message.channel.send(`${tag}, please mention someone to kick.`)
      }
    } else {
      message.channel.send(`${tag}, you don't have permission to use this Command.`)
    }
  }
};