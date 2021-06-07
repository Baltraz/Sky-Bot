const Discord = require('discord.js');
module.exports = {
  name: "Scammer",
  description: "Checks for Scammers in the Database.",
  usage: "!scammer IGN",
  perms: "None",
  folder: "Skyblock",
    execute: (client, message, args) => {
    message.delete();
    const MongoClient = require('mongodb').MongoClient;
    const uri = require('../../config.json').uri;
    const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    mclient.connect(async err => {
      if (err) throw err;
      const ign = args[0];
      const collection = mclient.db('Sky-Bot').collection('Scammers');
      let found = await collection.findOne({ scammerIGN: ign })
      const innocent = new Discord.MessageEmbed()
      .setTitle(`${ign} is Innocent.`)
      .setColor('GREEN')
      .setDescription('Still be very careful when trading with anybody!')

      if(ign === undefined) {
        message.channel.send('Please enter a IGN to check.')
        return;
      }

      if (found === null) {
        message.channel.send(innocent)
        return;
      }

      const embed = new Discord.MessageEmbed()
      .setTitle('SCAMMER!')
      .setDescription(`**IGN:** ${found.scammerIGN}\n**Reason:** ${found.scamREASON}\n**UUID:** ${found._id}`)
      .setColor('RED')
      
        message.channel.send(embed)

      mclient.close();
    }
  )}
};