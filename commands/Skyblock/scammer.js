const Discord = require('discord.js');
const axios = require('axios');
const sbz = require("../../sbz.json");
const urii = process.env['uri']


module.exports = {
  name: "Scammer",
  description: "Checks the SBZ and Sky Bot Database for Scammers",
  usage: "scammer (IGN)",
  perms: "None",
  folder: "Skyblock",
  async execute(client, message, args) {

    const ign = args[0];

    if (ign === undefined) {
      message.channel.send('Please enter a Username to check.')
      return;
    }
    
   message.react('<a:wait:847471618272002059>');
    
    axios.get(`https://api.mojang.com/users/profiles/minecraft/${ign}`).then(res => {
      const uuid = res.data.id;


if (uuid === undefined) {
  message.channel.send(`Invalid Username can\'t find ${ign} in the Mojang Database.`)
  return;
}

if (res.status != 200) {
                 message.channel.send('An Error has occured this is usually due to the API being overloaded or something going wrong pls try again in a minute.')
                 return;
                }

      const MongoClient = require('mongodb').MongoClient;
      const mclient = new MongoClient(urii, { useNewUrlParser: true, useUnifiedTopology: true });
      mclient.connect(async err => {
        if (err) throw err;
        const ign = args[0];
        const collection = mclient.db('Sky-Bot').collection('Scammers');
        let found = await collection.findOne({ _id: uuid })



        if (sbz[uuid]) {
          const sbzembed = new Discord.MessageEmbed()
            .setAuthor(ign, `https://cravatar.eu/helmavatar/${ign}/600.png`, `https://de.namemc.com/profile/${ign}`)
            .setTitle('⚠️USER IS A SCAMMER⚠️')
            .setDescription(`**DON\'T TRADE WITH THAT USER**\n\n**IGN:** ${ign}\n**Reason:** ${sbz[uuid]["reason"]}\n**UUID:** ${uuid}`)
            .setColor('RED')
          message.channel.send(sbzembed)
          return;
        } else if (found) {
          const sbembed = new Discord.MessageEmbed()
            .setAuthor(ign, `https://cravatar.eu/helmavatar/${ign}/600.png`, `https://de.namemc.com/profile/${ign}`)
            .setTitle('⚠️USER IS A SCAMMER⚠️')
            .setDescription(`**DON\'T TRADE WITH THAT USER**\n\n**IGN:** ${ign}\n**Reason:** ${found.scamREASON}\n**UUID:** ${uuid}`)
            .setColor('RED')
          message.channel.send(sbembed)
          return;
        } else {
          const innocent = new Discord.MessageEmbed()
            .setAuthor(ign, `https://cravatar.eu/helmavatar/${ign}/600.png`, `https://de.namemc.com/profile/${ign}`)
            .setTitle('<a:yes:847468695772987423> USER IS INNOCENT')
            .setDescription(`Still be careful when trading with anyone!`)
            .setColor('GREEN')
          message.channel.send(innocent)
        }
        mclient.close();


      })
    })
  }
};