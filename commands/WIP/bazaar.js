const Discord = require('discord.js');
const fetch = require('node-fetch');
const apikey = process.env['apikey'];

const loading = '847471618272002059'

module.exports = {
  name: "Bazaar",
  description: "Get Bazaar data for an item",
  usage: "bazzar (item)",
  perms: "None",
  folder: "Skyblock",
    async execute(client, message, args) {

      if(args[0] === undefined) {
        message.channel.send('Please enter an valid Item.\n**Example:** ENCHANTED_GOLD')
        return;
      }

      if (!args[0]) {
            var itemId = message.member.itemIdentity;
        } else {
            if (message.mentions.members.first()) {
                var itemId = message.mentions.members.first().itemIdentity;
            }
            else var itemId = args[0];

        var method = 'save';
        if (args[0]) method = args[0];
        }

        const apiData = await getApiData(itemId, method);

        message.react(loading);

        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(`Bazaar data for ${itemId}`)
                .setColor('7CFC00')
                .setAuthor(itemId, `https://sky.lea.moe/item/${itemId}`, `https://api.slothpixel.me/api/skyblock/bazaar/${itemId}`)
                .addFields(
                    {
                        name: 'Name',
                        value: [
                            `Product ID:`,
                            `Insta Sell Price:`,
                            `Amount of Sell Offers:`,
                            `Insta Buy Price:`,
                            `Amount of Buy Offers:`,
                        ].join('\n'),
                        inline: true
                    },
                    {
                        name: 'Data',
                        value: [
                            `${itemId}`,
                            `${toFixed(apiData.quick_status.sellPrice)} price per unit`,
                            `${toFixed(apiData.quick_status.sellOrders)}`,
                            `${toFixed(apiData.quick_status.buyPrice)} price per unit`,
                            `${toFixed(apiData.quick_status.buyOrders)}`,
                        ].join('\n'),
                        inline: true
                    }
                )
                .setTimestamp()
        ).then(message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error)))
    }
};

async function getApiData(itemId) {
    delete require.cache[require.resolve('../../config.json')];
    const config = require('../../config.json');

    const response = await fetch(`https://api.slothpixel.me/api/skyblock/bazaar/${itemId}?key=${apikey}`);
    return await response.json();
}

function toFixed(num) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?');
    return num.toString().match(re)[0];
}