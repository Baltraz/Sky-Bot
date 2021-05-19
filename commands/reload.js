const discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    execute: (bot, message, args) => {
    if(message.author.id != "570267487393021969") return message.channel.send("You're the bot owner!")

  if(!args[0]) return message.channel.send("Please provide a command to reload!")

  let commandName = args[0].toLowerCase()

  try {
    delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
    bot.commands.delete(commandName)
    const pull = require(`./${commandName}.js`)
    bot.commands.set(commandName, pull)
  } catch(err) {
       console.log(err);
       return message.channel.send(`Couldn't reload: \`${args[0].toUpperCase()}\``)
  }

  message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded!`)
  }
};