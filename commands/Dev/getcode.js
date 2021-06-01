const config = require('../../config.json');
module.exports = {
    name: "Getcode",
    description: "Sends the code for a given command to chat. (Baltraz Only)",
    usage: "!getcode <filename>",
    perms: "Dev",
    folder: "Dev",
    execute: (bot, message, args) => {
      if (message.author.id !== config.ownerID) return message.channel.send("Can't use this!")
      message.delete();
      if (!args[0]) return message.channel.send("Please provide a valid Command!")
        message.channel.send(`\`\`\`js\n${bot.commands.get(args[0].toLowerCase()).execute.toString()}\`\`\``);
    } 
};