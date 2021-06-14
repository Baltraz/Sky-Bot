const Discord = require('discord.js');

module.exports = {
  name: "Changelog",
  description: "Shows the Bots Changes/Updates",
  usage: "changelog",
  perms: "None",
  folder: "Config",
    execute: (client, message, args) => {

      const cembed = new Discord.MessageEmbed()
      .setTitle('Sky Bot Changelog')
      .setDescription('Version 1.1.0 Changelog\n\nAdded Scammer Checks(Supports my List and the SBZ one) and reports see #scammer-reports for reporting people.\n\nAdded "!setupmute" to automatically set Permissions for the Muted role if one exists.\n\nSKYBLOCK COMMANDS yes everyone favourite for now we got skill checking, dungeon stats checking and a small overview about the player(will add full on weight checking etc)\n\nSome Bugs fixes for Commands not working properly.\n\nWill get a better host soon which should improve the bot response time a good bit due to SOME SPECIAL THINGS(stay tuned for that its really nice)\n\nAnd Probably some other fixes or things i forgot lol.')
      
      message.channel.send(cembed)
    }
};