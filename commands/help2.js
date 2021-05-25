const discord = require('discord.js');

module.exports = {
    execute: (bot, message, args) => {

const commands = message.client.commands

if (commands.some(c => c.name.toLowerCase() === args[0].toLowerCase())) {
const embed2 = new discord.Message.Embed()

message.client.commands.each(command => embed.setTitle(command.name),
embed.setDescription(command.description),
embed.addField(command.usage))
message.channel.send(embed2)
}
else if (args.lenght === 0) {
      const embed = new discord.MessageEmbed()
.setTitle("Help")
.setColor("RANDOM")

message.client.commands.each(command => embed.addField(command.name, command.description))
message.channel.send(embed)
}
else {
message.channel.send(`Unknown Command!`)
}}}