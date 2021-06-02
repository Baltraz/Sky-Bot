const discord = require('discord.js');

module.exports = {
  name: "Avatar",
  description: "Sends the Users Avatar",
  usage: "!avatar",
  perms: "None",
  folder: "Fun",
    execute: (bot, message, args) => {
      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      

      if (user) {
      message.channel.send(`The Users Avatar: ${user.displayAvatarURL({ format: 'png', dynamic: true })}`);
    } else {
      message.channel.send("Error. This may be cause because you pinged an Invalid User.")
    }    
  }
};