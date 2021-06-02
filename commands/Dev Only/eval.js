const discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Eval",
  description: "Allows execution of Code from Discord. (Baltraz Only)",
  usage: "!eval <command snipet>",
  perms: "Dev",
  folder: "Dev",
  execute: (bot, message, args) => {
    if (message.author.id !== config.ownerID) return message.channel.send("Can't use this!")
  try {
    var result = args.join(" ")
    let noResultArg = new discord.MessageEmbed()
    .setColor("RED")
    .setDescription("ERROR: No valid eval args were provided")
    if (!result) return message.channel.send(noResultArg)
    let evaled = eval(result);
    
    
    let resultSuccess = new discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle("Success")
    .addField(`Input:\n`, '```js\n' + `${args.join(" ")}` + '```', false)
    .addField(`Output:\n`, '```js\n' + evaled + '```', true)
    
    message.channel.send(resultSuccess)
    
  } catch (error) {
    let resultError = new discord.MessageEmbed()
    .setColor("RED")
    .setTitle("An error has occured")
    .addField(`Input:\n`, '```js\n' + `${result}` + '```', false)
    .addField(`Output:\n`, '```js\n' + `${error.message}` + '```', true)
    //.setDescription(`Output:\n\`\`\`${err}\`\`\``)
    return message.channel.send(resultError)
  }
  }
};