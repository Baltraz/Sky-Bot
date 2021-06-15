const Discord = require('discord.js');
const config = require("../../config.json");
const pms = require('pretty-ms');

module.exports = {
  name: "Eval",
  description: "Allows execution of Code from Discord. (Dev Only)",
  usage: "eval <command snipet>",
  perms: "Dev",
  folder: "Dev",
  execute: (client, message, args) => {
    if (message.author.id !== config.ownerID) return message.channel.send("Can't use this!")
  try {
    var result = args.join(" ")
    let noResultArg = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("ERROR: No valid eval args were provided")
    if (!result) return message.channel.send(noResultArg)
    let evaled = eval(result);
    
    
    let resultSuccess = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle("Eval Success")
    .addField(`<:input:849565147331559424> Input:\n`, '```js\n' + `${args.join(" ")}` + '```', false)
    .addField(`<:output:849565147348336650> Output:\n`, '```js\n' + evaled + '```', true)
    
    message.channel.send(resultSuccess)
    
  } catch (error) {
    let resultError = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle("An error has occured")
    .addField(`<:input:849565147331559424> Input:\n`, '```js\n' + `${result}` + '```', false)
    .addField(`<:output:849565147348336650>Output:\n`, '```js\n' + `${error.message}` + '```', true)
    //.setDescription(`Output:\n\`\`\`${err}\`\`\``)
    return message.channel.send(resultError)
  }
  }
};