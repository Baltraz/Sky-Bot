const ms = require('ms');
const Discord = require('discord.js');

module.exports = {
	name: 'Unmute',
	description: 'Unmute a Member',
	usage: 'unmute (Mention Member or ID)\n\`Example: !unmute 570267487393021969\`',
	perms: 'Manage Roles',
	folder: 'Moderation',
	execute(client, message, args) {
		try {

    if (!message.member.hasPermission('MANAGE_ROLES'))
			return message.channel.send(
				'You are missing the Permission `MANAGE_ROLES`.'
			);
		if (!message.guild.me.hasPermission('MANAGE_ROLES'))
			return message.channel.send("I don't have `MANAGE_ROLES` Permission.");
		if (!message.guild.roles.cache.find(role => role.name === 'Muted'))
			return message.channel.send("Can't find a Role named `Muted`.");

		const target =
			message.mentions.users.first() ||
			message.guild.members.cache.get(args[0]);
		if (target) {
			let muteRole = message.guild.roles.cache.find(
				role => role.name === 'Muted'
			);

			let memberTarget = message.guild.members.cache.get(target.id);

			memberTarget.roles.remove(muteRole.id);
      const muteembed = new Discord.MessageEmbed()
      .setTitle('<a:yes:847468695772987423> User Unmuted')
      .setColor('GREEN')
      .setDescription(`<@${memberTarget.user.id}> has been unmuted.`)
			message.channel.send(muteembed);
		} else {
      message.channel.send("You didnt mention anyone to Unmute. (Please mention a User or an ID)")
    }
    } catch (error) {
      console.error(error)
      const errorembed = new Discord.MessageEmbed()
      .setTitle('Error')
      .setDescription('Invalid Unmute Format. (See !help unmute).')
      message.channel.send(errorembed)
    }
	}
};