const Discord = require('discord.js');
const axios = require('axios');
const sbz = require("../../sbz.json");
const urii = process.env['uri']


module.exports = {
  name: "Scammer",
  description: "Checks the SBZ and Sky Bot Database for Scammers",
  usage: "!scammer (IGN)",
  perms: "None",
  folder: "Skyblock",
    async execute(client, message, args) {

const ign = args[0];

if(ign === undefined) {
  message.channel.send('Please enter a Username to check.')
  return;
}
axios.get(`https://some-random-api.ml/mc?username=${ign}`).then(res => {
				const uuid = res.data.uuid;


    const MongoClient = require('mongodb').MongoClient;
    const mclient = new MongoClient(urii, { useNewUrlParser: true, useUnifiedTopology: true });
    mclient.connect(async err => {
      if (err) throw err;
      const ign = args[0];
      const collection = mclient.db('Sky-Bot').collection('Scammers');
      let found = await collection.findOne({ _id: uuid })



    if(sbz[uuid]) {
      const sbzembed = new Discord.MessageEmbed()
      .setTitle('⚠️USER IS A SCAMMER⚠️')
      .setDescription(`**IGN:** ${ign}\n**Reason:** ${sbz[uuid]["reason"]}\n**UUID:** ${uuid}`)
      .setColor('RED')
      message.channel.send(sbzembed)
      return;
    } else if (found) {
      const sbembed = new Discord.MessageEmbed()
      .setTitle('⚠️USER IS A SCAMMER⚠️')
      .setDescription(`**IGN:** ${ign}\n**Reason:** ${found.scamREASON}\n**UUID:** ${uuid}`)
      .setColor('RED')
      message.channel.send(sbembed)
      return;
    } else {
      const innocent = new Discord.MessageEmbed()
      .setTitle('<a:yes:847468695772987423> USER IS A INNOCENT')
      .setDescription(`Still be careful when trading with anyone!`)
      .setColor('GREEN')
      message.channel.send(innocent)
    }
      mclient.close();


    })
})
}
};