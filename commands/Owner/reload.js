const discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Reload",
  description: "Allows Commads to be reloaded. (Baltraz Only)",
  usage: "!reload <Command Name>",
  perms: "BotOwner",
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
      const fs = require("fs");
      const commandFolders = fs.readdirSync('./commands');

      for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
          for (const file of commandFiles) {
            if (file.toLowerCase().includes(commandName.toLowerCase())) {
            delete require.cache[require.resolve(`../${folder}/${file}`)]
            bot.commands.delete(commandName)
            const pull = require(`../${folder}/${file}`)
            bot.commands.set(commandName, pull)
      }
  }
}} catch (err) {
      console.log(err);
      return message.channel.send(embedno)
    }
    message.channel.send(embedyes)
  }
};