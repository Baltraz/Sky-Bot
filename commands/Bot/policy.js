const Discord = require('discord.js');

module.exports = {
  name: "policy",
  description: "Shows the General Rules of Conduct for  the Bot",
  usage: "!policy",
  perms: "None",
  folder: "Bot",
    execute: (client, message, args) => {

      const policy = new Discord.MessageEmbed()
      .setTitle('Sky Bot Rules')
      .setColor('ORANGE')
      .setDescription('1. Any abuse of the Bot will result in actions being taken.\n2. The Bot currently doesn\'t store any Data of the User. This may change in the Future and will be announced in my Server if it changes.\n3. You can always contact the Bot Dev on Discord by adding him as a Friend. \`Baltraz#4874\`\n4. All the Code and Design ways of various Embeds are protected and not to be copied.')
      message.channel.send(policy)
      
    }
};
