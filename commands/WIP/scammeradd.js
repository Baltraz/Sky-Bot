
const urii = process.env['uri']
const Discord = require('discord.js');
const config = require('../../config.json')
const axios = require('axios')

module.exports = {
  name: "scammeradd",
  description: "Adds a Scammer to the Database (Dev Only)",
  usage: "!scammeradd (Scammer IGN) (Scammer Reason)",
  perms: "Dev Only",
  folder: "Skyblock",
  execute: (client, message, args) => {
    if (message.author.id !== '570267487393021969' && message.author.id !== '637943235523641373') return message.channel.send("You are not allowed to do this.");

    message.delete();

    const scammerIGN = args[0];
    const scamREASON = args.slice(1).join(' ');

    if(args[0] === undefined || args[1] === undefined) {
      message.channel.send("!scammeradd (Scammer IGN) (Scammer Reason)");
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
        { $set: { scammerIGN: scammerIGN, scamREASON: scamREASON } },
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