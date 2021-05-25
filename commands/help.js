const discord = require('discord.js');

module.exports = {
  name: "Help",
  description: "Shows",
  usage: "!help <Command Name>",
  execute: (bot, message, args) => {

    const commands = message.client.commands
    if (args.length === 0) {
      const embed1 = new discord.MessageEmbed()
        .setTitle("Available Commands")
        .setColor("add8e6")
        .addFields(
          { name: "Usage:", value: "!help <Command> to get a more Detailed Information about the Command." })
      const l = [];

      message.client.commands.each(c => l.push(c.name));
      embed1.setDescription(l.join(", "));
      message.channel.send(embed1)

    } else if (commands.some(c => c.name.toLowerCase() === args[0].toLowerCase())) {
      const embed2 = new discord.MessageEmbed()
        .setColor("GREY")

      message.client.commands.forEach(command => {
        if (command.name.toLowerCase() == args[0].toLowerCase()) {
          embed2.setTitle(command.name),
            embed2.setDescription(command.description),
            embed2.addField(command.usage)
        }
      })
      message.channel.send(embed2)
    } else {
      message.channel.send(`Unknown Command!`)
    }
  }
}