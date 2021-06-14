const Discord = require('discord.js');

module.exports = {
    name: 'Skin',
    usage: 'skin (IGN)',
    description: 'Gets player head from their ign',
    execute(client, message, args) {

  const ign = args[0];
  
  if (!ign) {
    message.channel.send('Please enter an IGN.')
    return;
  }
           message.channel.send(
            new Discord.MessageEmbed()
                .setAuthor(ign, `https://cravatar.eu/helmavatar/${ign}/600.png`, `https://de.namemc.com/profile/${ign}`)
                .setImage(`https://cravatar.eu/helmavatar/${ign}/600.png`)
                .setColor('7CFC00')
                .setFooter('Click their Name to see their Full Skin')
        )
        } 
    };