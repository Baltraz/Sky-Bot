const discord = require('discord.js');

module.exports = {
    execute: async (bot, message, args) => {
      message.delete();
    message.channel.send(
      new discord.MessageEmbed()
        .setTitle("Command List")
        .setDescription("This is how to use all the commands. Any questions? DM <@570267487393021969>")
        .setColor('ff0000')
        .addFields(
          {name: "Spamping", value: "Usage: !sp <Amount of Pings> <Delete Pings y/n> <User to Ping>", inline: false},
          {name: "Online", value: "Usage: !online (Sends a Message in <#843760730494861364> every 4 Minutes to keep the Bot online).", inline: false},
          {name: "Shutdown", value: "Usage: !kill (Baltraz only)", inline: false},
          {name: "Reload", value: "Usage: !reload <commandName> (Baltraz only", inline: false})
        .setFooter("Made by Baltraz#4874"))
        }};