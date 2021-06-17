const Discord = require('discord.js');

module.exports = {
  name: "Userinfo",
  description: "Shows some Info about the User.",
  usage: "userinfo",
  perms: "None",
  folder: "QOL",
  execute: (client, message, args) => {

const mentionedMember = message.mentions.members.first();
if (!mentionedMember) return;
const mentionedUser = mentionedMember.user;

console.log(mentionedMember)

if(!args.length) {
  message.channel.send('Please mentioned a User in the Server')
  return;
}

     const embed = new Discord.MessageEmbed()
        .setTitle("User Info")
        .setColor('00ff00')
        .addFields(
          { name: "User", value: `${mentionedUser.tag}`, inline: true },
          { name: "User ID", value: `${mentionedUser.id}`, inline: true },
          { name: "Server Join Date", value: `${mentionedMember.joinedAt}`, inline: true },
          {name: 'Roles', value: `${mentionedMember.user._roles}`, inline: true})
        message.channel.send(embed)
  }
};