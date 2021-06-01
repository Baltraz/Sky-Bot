const discord = require('discord.js')
const chalk = require('chalk');

module.exports = {
    name: 'welcomeE',
    execute(guild, bot) {

      const MongoClient = require('mongodb').MongoClient;
    const uri = require('../../config.json').uri;
    const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    mclient.connect(async err => {
      if (err) throw err;
      const collection = mclient.db('Sky-Bot').collection('Servers');
        let foundDoc = await collection.findOne({ _id: message.guild.id })
        let role = message.guild.roles.cache.get(foundDoc.welcomeRole)
        let channel = message.guild.channels.cache.get(foundDoc.welcomeChannel)
        console.log(channel)
        console.log(role)
      mclient.close();
    })
  }
};