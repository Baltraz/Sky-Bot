const discord = require('discord.js');

module.exports = {
  name: "policy",
  description: "Shows the General Rules of Conduct for  the Bot",
  usage: "!policy",
  perms: "None",
  folder: "QOL",
    execute: (bot, message, args) => {
      message.delete()
      const policy = new discord.MessageEmbed()
      .setTitle('Sky Bot Rules')
      .setColor('ORANGE')
      .setDescription('1. Any abuse of the Bot will result in actions being taken.\n2. The Bot currently doesn\'t store any Data of the User. This may change in the Future and will be announced in my Server if it changes.\n3. You can always contact the Bot Dev on Discord by adding him as a Friend. \`Baltraz#4874\`')
      message.channel.send(policy)
      
    }
};
