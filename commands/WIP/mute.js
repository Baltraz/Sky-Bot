const ms = require('ms');
module.exports = {
    name: 'Mute',
    description: "This mutes a member",
    usage: "!mute (Mention Member or ID) (Amount of Time in Minutes)\nExample: !mute 570267487393021969 1m",
    perms: "Manage Roles",
    folder: "Moderation",
    execute(bot, message, args) {
      if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("You are missing the Permission \`MANAGE_ROLES\`.");
    if (!message.guild.me.hasPermission('MANAGE_ROLES'))return message.channel.send("I don\'t have \`MANAGE_ROLES\` Permission.");

        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (target) {
 
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
 
            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);
 
            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
            }, ms(args[1]));
        } else {
            message.channel.send('Cant find that member!');
        }
    }
}