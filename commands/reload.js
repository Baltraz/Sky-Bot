const discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: "Reload",
  description: "Allows me to reload Commands!",
  usage: "!reload <Command Name>",
  execute: (bot, message, args) => {
    if (message.author.id != config.ownerID) return message.channel.send("Can't use this!")
    message.delete();

    if (!args[0]) return message.channel.send("Please provide a command to reload!")

    let commandName = args[0].toLowerCase()


    const embedyes = new discord.MessageEmbed()
      .setColor('00ff00')
      .setDescription(`Successfully reloaded **${commandName}**!`)

    const embedno = new discord.MessageEmbed()
      .setColor('ff0000')
      .setDescription(`Couldn't reload **${commandName}**!\nMaybe you typed the **CommandName wrong** if not check the Console.`)


    try {
      delete require.cache[require.resolve(`./${commandName}.js`)]
      bot.commands.delete(commandName)
      const pull = require(`./${commandName}.js`)
      bot.commands.set(commandName, pull)
    } catch (err) {
      console.log(err);
      return message.channel.send(embedno)
    }
    message.channel.send(embedyes)
  }
};