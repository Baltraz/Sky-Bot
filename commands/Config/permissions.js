const discord = require('discord.js');

module.exports = {
  name: "Permissions",
  description: "Shows what Permissions the Bot has/needs",
  usage: "!permissions",
  perms: "Admin",
  folder: "Config",
    execute: (bot, message, args) => {
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You are missing the Permission \`ADMINISTRATOR\`.");
      message.delete()

      const pembed = new discord.MessageEmbed()
      .setTitle('Permission Check')
      .setDescription('✅ = Has the Permission.\n🚫 = Doesn\'t have the Permission.')
      .setColor('ORANGE')
      
      if (message.guild.me.hasPermission('BAN_MEMBERS')) {
        pembed.addField("BAN_MEMBERS", '✅', true)
      } else if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
        pembed.addField("BAN_MEMBERS", '🚫', true)
      }

      if (message.guild.me.hasPermission('KICK_MEMBERS')) {
        pembed.addField("KICK_MEMBERS", '✅', true)
      } else if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
        pembed.addField("KICK_MEMBERS", '🚫', true)
      }

      if (message.guild.me.hasPermission('MANAGE_MESSAGES')) {
        pembed.addField("MANAGE_MESSAGES", '✅', true)
      } else if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
        pembed.addField("MANAGE_MESSAGES", '🚫', true)
      }

      if (message.guild.me.hasPermission('MANAGE_ROLES')) {
        pembed.addField("MANAGE_ROLES", '✅', true)
      } else if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
        pembed.addField("MANAGE_ROLES", '🚫', true)
      }

      if (message.guild.me.hasPermission('EMBED_LINKS')) {
        pembed.addField("EMBED_LINKS", '✅', true)
      } else if (!message.guild.me.hasPermission('EMBED_LINKS')) {
        pembed.addField("EMBED_LINKS", '🚫', true)
      }

      if (message.guild.me.hasPermission('USE_EXTERNAL_EMOJIS')) {
        pembed.addField("USE_EXTERNAL_EMOJIS", '✅', true)
      } else if (!message.guild.me.hasPermission('USE_EXTERNAL_EMOJIS')) {
        pembed.addField("USE_EXTERNAL_EMOJIS", '🚫', true)
      }

      message.channel.send(pembed)
    }
};