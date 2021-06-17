const urii = process.env['uri']
const Discord = require('discord.js');
const config = require('../../config.json')
const axios = require('axios')



module.exports = {
  name: "scammeradd",
  description: "Adds a Scammer to the Database (Dev Only)",
  usage: "scammeradd (Scammer IGN) (Scammer Reason)",
  perms: "Scam Managers Only",
  folder: "Skyblock",
  execute: (client, message, args) => {
    if(!config.scammanagers.includes(message.author.id)) { 
const noperms = new Discord.MessageEmbed()
.setDescription('You tried using a Scam Manager Only Command.\nIf you want to report a Scammer join https://discord.gg/Ca6XpTRQaR and report them there.')
.setColor('ORANGE')
message.channel.send(noperms)
return;
}


    const scammerIGN = args[0];
    const scamPROOF = args[1];
    const scamREASON = args.slice(2).join(' ');

    if(args[0] === undefined || args[1] === undefined) {
      message.channel.send("scammeradd (Scammer IGN) (Scam Proof[IMGUR Link]) (Scam Reason)");
      return;
    }

    // get uuid from mentioned ign here
    axios.get(`https://some-random-api.ml/mc?username=${scammerIGN}`).then(res => {
				const uuid = res.data.uuid;

    const MongoClient = require('mongodb').MongoClient;
    const mclient = new MongoClient(urii, { useNewUrlParser: true, useUnifiedTopology: true });
    mclient.connect(async err => {
      if (err) throw err;
      const collection = mclient.db('Sky-Bot').collection('Scammers');
      
      await collection.updateOne(
        { _id: uuid },
        { $set: { scammerIGN: scammerIGN, scamPROOF: scamPROOF, scamREASON: scamREASON } },
        { upsert: true }
      )

      const sucEmbed = new Discord.MessageEmbed()
        .setTitle('Scammer Added')
        .setColor('GREEN')
        .setDescription(`Successfully added **${scammerIGN}** to the Scammer list for: **${scamREASON}**`)
        .setFooter(`Added by ${message.author.tag}`)


      await message.channel.send(sucEmbed);
      await client.channels.fetch(config.scamlog)
        .then(channel => channel.send(sucEmbed))
        .catch(console.error)
      mclient.close();
      })
    })
  }
};