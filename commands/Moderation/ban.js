const discord = require('discord.js');

module.exports = {
  name: "Ban",
  description: "Ban a Member from the Discord",
  usage: "!ban (Member) <Ban Reason>",
  execute: (bot, message, args) => {
    const { member, mentions } = message
    const tag = `<@${member.id}>`
    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`✅ <@${target.id}>, has been banned.`)

      } else {
        message.channel.send(`${tag}, please mention someone to ban.`)
      }
    } else {
      message.channel.send(`${tag}, you don't have permission to use this Command.`)
    }
  }
};