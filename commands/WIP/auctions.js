const Discord = require('discord.js');
const fetch = require('node-fetch');
const apikey = process.env['apikey']



module.exports = {
    name: 'Auctions',
    usage: 'auctions (IGN)',
    description: "Show Auctions for the mentioned User",
    async execute(client, message, args) {

      message.channel.send('Out of order hypixel weird')
      return;

        if (!args[0]) {
            var ign = message.member.displayName;
        } else {
            if (message.mentions.members.first()) {
                var ign = message.mentions.members.first().displayName;
            }
            else var ign = args[0];
        } // Gets IGN

        ign = ign.replace(/\W/g, ''); // removes weird characters


        fetch(`https://api.mojang.com/users/profiles/minecraft/${ign}`)
            .then(res => {
                if (res.status != 200) {
                    return message.channel.send(
                        new Discord.MessageEmbed()
                            .setDescription(`No Minecraft account found for \`${ign}\``)
                            .setColor('DC143C')
                            .setTimestamp()
                    )
                }
            }); // Test if IGN esists
        

        ign = await getTrueIgn(ign);


        // At this point we know its a valid IGN, but not if it has skyblock profiles


        const waitembed = new Discord.MessageEmbed()
        .setDescription('Checking for Player Data . . .')
        .setFooter('If i don\'t respond within 10 Seconds then theres an Error at the Hypixel API\nTry again later pls.')
        .setColor('ORANGE')

        const waitingembed = await message.channel.send(waitembed)


        const apiData = await getApiData(ign); // Gets all skyblock player data from Senither's Hypixel API Facade

        console.log(apiData.auctions.uuid)


        if (apiData.status != 200) {
            const errorembed = new Discord.MessageEmbed()
                    .setDescription('There wasn an Error getting the Data from the Hypixel API.\nPlease try again later!')
                    .setColor('DC143C')
                    .setTimestamp()

            waitingembed.edit(errorembed);
            return;
        } 

      if(apiData === undefined) {
            const noauctions = new Discord.MessageEmbed()
                    .setDescription(`No Auctions found for ${ign}.`)
                    .setColor('DC143C')
                    .setTimestamp()

            waitingembed.edit(noauctions);
            return;
      }

    const auctionsfound = new Discord.MessageEmbed()
    .setTitle(`Found Data for ${ign}`)


    waitingembed.edit(auctionsfound)
    }
};



async function getUUID(ign) {
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${ign}`);
    const result = await response.json();
    return result.id;
}

async function getApiData(ign) {
    delete require.cache[require.resolve('../../config.json')];
    const config = require('../../config.json');

    const UUID = await getUUID(ign);
    const response = await fetch(`https://api.hypixel.net/skyblock/auction?uuid=${UUID}&key=${apikey}`);
    return await response.json();
} 

async function getTrueIgn(ign) {
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${ign}`);
    const result = await response.json();
    return result.name;
}

function toFixed(num) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?');
    return num.toString().match(re)[0];
}