const discord = require('discord.js');

module.exports = {
  name: "Setup",
  description: "Shows everything the Bot needs to work properly.",
  usage: "!setup",
  perms: "Admin",
  folder: "Config",
    execute: (client, message, args) => {
   if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You are missing the Permission \`ADMINISTRATOR\`.");
      message.delete()

      const pembed = new discord.MessageEmbed()
      .setTitle('Sky Bot Setup Check')
      .setDescription('<a:yes:847468695772987423> = Has the Permission.\n<a:no:847468672380829707> = Doesn\'t have the Permission.')
      .setColor('ORANGE')
      
      
      
      if (message.guild.roles.cache.find(role => role.name === 'Muted')) {
        pembed.addField("Muted Role", "<a:yes:847468695772987423>", true)
      } else if (!message.guild.roles.cache.find(role => role.name === 'Muted'))  { pembed.addField("Muted Role", "<a:no:847468672380829707>", true)}
      
      
      if (message.guild.roles.cache.find(role => role.name === 'Verified')) {
        pembed.addField("Verified Role", "<a:yes:847468695772987423>", true)
      } else if (!message.guild.roles.cache.find(role => role.name === "Verified")) {
        pembed.addField("Verified Role", "<a:no:847468672380829707>", true)
      }
      
      
      if (message.guild.me.hasPermission('BAN_MEMBERS')) {
        pembed.addField("BAN_MEMBERS", '<a:yes:847468695772987423>', true)
      } else if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
        pembed.addField("BAN_MEMBERS", '<a:no:847468672380829707>', true)
      }

      if (message.guild.me.hasPermission('KICK_MEMBERS')) {
        pembed.addField("KICK_MEMBERS", '<a:yes:847468695772987423>', true)
      } else if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
        pembed.addField("KICK_MEMBERS", '<a:no:847468672380829707>', true)
      }

      if (message.guild.me.hasPermission('MANAGE_MESSAGES')) {
        pembed.addField("MANAGE_MESSAGES", '<a:yes:847468695772987423>', true)
      } else if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
        pembed.addField("MANAGE_MESSAGES", '<a:no:847468672380829707>', true)
      }

      if (message.guild.me.hasPermission('MANAGE_ROLES')) {
        pembed.addField("MANAGE_ROLES", '<a:yes:847468695772987423>', true)
      } else if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
        pembed.addField("MANAGE_ROLES", '<a:no:847468672380829707>', true)
      }

      if (message.guild.me.hasPermission('EMBED_LINKS')) {
        pembed.addField("EMBED_LINKS", '<a:yes:847468695772987423>', true)
      } else if (!message.guild.me.hasPermission('EMBED_LINKS')) {
        pembed.addField("EMBED_LINKS", '<a:no:847468672380829707>', true)
      }

      if (message.guild.me.hasPermission('USE_EXTERNAL_EMOJIS')) {
        pembed.addField("USE_EXTERNAL_EMOJIS", '<a:yes:847468695772987423>', true)
      } else if (!message.guild.me.hasPermission('USE_EXTERNAL_EMOJIS')) {
        pembed.addField("USE_EXTERNAL_EMOJIS", '<a:no:847468672380829707>', true)
      }
      
      if (message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
        pembed.addField("MANAGE_NICKNAMES", '<a:yes:847468695772987423>', true)
      } else if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
        pembed.addField("MANAGE_NICKNAMES", '<a:no:847468672380829707>', true)
      }
      
      if (message.guild.me.hasPermission('MANAGE_CHANNELS')) {
        pembed.addField("MANAGE_CHANNELS", '<a:yes:847468695772987423>', true)
      } else if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) {
        pembed.addField("MANAGE_CHANNELS", '<a:no:847468672380829707>', true)
      }
      
      if (message.guild.me.hasPermission('ADMINISTRATOR')) {
        pembed.addField("ADMINISTRATOR (Not required if other Perms are Checked)", '<a:yes:847468695772987423>', true)
      } else if (!message.guild.me.hasPermission('ADMINISTRATOR')) {
        pembed.addField("ADMINISTRATOR (Not required if other Perms are Checked)", '<a:no:847468672380829707>', true)
      }



      message.channel.send(pembed)
    }
};