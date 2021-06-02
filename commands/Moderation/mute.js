const ms = require('ms');
const discord = require('discord.js');

module.exports = {
	name: 'Mute',
	description: 'Mute a Member',
	usage:
		'!mute (Mention Member or ID) (Amount of Time in m/h/d)\n\`Example: !mute 570267487393021969 1m\`\nMax Mute Duration is 20 Days.(Timer will Freeze on Bot Restart don\'t go above 6-12h.',
	perms: 'Manage Roles',
	folder: 'Moderation',
	execute(bot, message, args) {
		try {
      message.delete();
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

			memberTarget.roles.add(muteRole.id);
      const muteembed = new discord.MessageEmbed()
      .setTitle('<a:yes:847468695772987423> User Muted')
      .setColor('GREEN')
      .setDescription(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}.`)
			message.channel.send(muteembed);

			setTimeout(function() {
				memberTarget.roles.remove(muteRole.id);
			}, ms(args[1]));
		} else {
      message.channel.send("You didnt mention anyone to Mute. (Please mention a User or an ID)")
    }
    } catch (error) {
      console.error(error)
      const errorembed = new discord.MessageEmbed()
      .setTitle('<a:no:847468672380829707> Error')
      .setColor('RED')
      .setDescription('Invalid Format.\n\`Use !mute (User) (Time in m/h).\`\nThis Error may also be from me not being able to assign the Role due to it being above me or Missing Permissions (Check !permissions to see if im missing any Permissions.)')
      message.channel.send(errorembed)
    }
	}
};