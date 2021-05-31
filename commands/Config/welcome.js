const discord = require('discord.js');

module.exports = {
  name: "welcome",
  description: "Sets the Welcome Role and Welcome Channel for your Server",
  usage: "!welcome (Mention Role/Send Role ID) (Mention Channel/Send Channel ID)",
  perms: "Admin",
  execute: (bot, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;

const role = message.mentions.roles.first() ? message.mentions.roles.first() : message.guild.roles.cache.get(args[0]);
const channel = message.mentions.channels.first() ? message.mentions.channels.first() : message.guild.channels.cache.get(args[1]);

if(args[0] === undefined || args[1] === undefined) return message.channel.send("Please enter a Valid Role and/or Channel.")

    const MongoClient = require('mongodb').MongoClient;
    const uri = require('../../config.json').uri;
    const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    mclient.connect(async err => {
      if (err) throw err;
      const collection = mclient.db('Sky-Bot').collection('Servers');
      const main = {
        _id: message.guild.id,
        welcomechannel: channel.id,
        welcomerole: role.id,
      };
      await collection.updateOne(
        { _id: message.guild.id },
        { $set: { welcomechannel: channel.id } },
        { $set: { welcomerole: role.id } },
        { upsert: true }
      )
      const foundDocument = await collection.findOne();
      mclient.close();


      const sucembed = new discord.MessageEmbed()
        .setTitle('Welcome Setup')
        .setColor('GREEN')
        .setDescription(`Successfully set the WelcomeChannel to ${channel}.\nSuccesfully set the WelcomeRole to ${role}.`)

      message.channel.send(sucembed);
    })
  }
};