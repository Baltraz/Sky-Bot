const discord = require('discord.js');

module.exports = {
	name: 'Slowmode',
	description: 'Increase/Decrease slomode of a channel',
	usage: '!slowmode (Time)\n\`Time Between 1 and 21600 (Enter 0 to remove Slowmode.)\`',
	perms: 'Manage Channels',
  folder: "Moderation",
	async execute(bot, message, args) {
		if (!message.member.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send('You are missing the Permission \`MANAGE_CHANNELS\`.'
			);
		if (!message.guild.me.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send('I don\'t have `MANAGE_CHANNELS` Permission.');

		const time = parseInt(args[0]);

		if (time === 0)
			return message.channel.setRateLimitPerUser(null);
		if (!time || time > 21600)
			return message.channel.send("Enter a Number between 1 and 21600.\nOr 0 to remove the Slowmode.");

		const embed = new discord.MessageEmbed()
			.setTitle('Slowmode')
			.setDescription(`Slowmode of ${message.channel} is now set to ${time} Seconds.`)
			.setColor('#00FF00')
			.setFooter(`Done by ${message.author.tag}.`);

		message.channel.setRateLimitPerUser(time).catch(err => console.log(err));
		message.channel.send(embed);
	}
};
