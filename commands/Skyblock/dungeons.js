const Discord = require('discord.js');
const fetch = require('node-fetch');


module.exports = {
    name: 'Dungeons',
    usage: '!dungeons (IGN)',
    description: "Show Dungeons Stats for the mentioned User",
    async execute(client, message, args) {
      if(args[0] === undefined) {
  message.channel.send('Please enter a IGN')
  return;
}
        if (!args[0]) {
            var ign = message.member.displayName;
        } else {
            if (message.mentions.members.first()) {
                var ign = message.mentions.members.first().displayName;
            }
            else var ign = args[0];
        } // Gets IGN

        ign = ign.replace(/\W/g, ''); // removes weird characters

        message.react('<a:wait:847471618272002059>');

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
        const apiData = await getApiData(ign); // Gets all skyblock player data from Senither's Hypixel API Facade

        if (apiData.status != 200) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setDescription(apiData.reason)
                    .setColor('DC143C')
                    .setTimestamp()
            )
        } 
        if(!apiData.data.dungeons) return message.channel.send("This player hasn't played dungeons yet")

        // IGN is valid and player has skyblock profiles

        return message.channel.send( // EDIT THIS BIT
            new Discord.MessageEmbed()  
                .setTitle(`Dungeons Stats for ${ign}`)
                .setColor('7CFC00')
                .setAuthor(ign, `https://cravatar.eu/helmavatar/${ign}/600.png`, `http://sky.shiiyu.moe/stats/${ign}`)
                .setDescription(`Catacombs Level: **${toFixed(apiData.data.dungeons.types.catacombs.level)}**\nSecrets Count: **${toFixed(apiData.data.dungeons.secrets_found)}**`)
                .addFields(
                    {name: "<:healer:852079613001990175> Healer Level", value: toFixed(apiData.data.dungeons.classes.healer.level), inline: true},
                    {name: "<:mage:852079612699607072> Mage Level", value: toFixed(apiData.data.dungeons.classes.mage.level), inline: true},
                    {name: "<:berserker:852079613052059658> Berserker Level", value: toFixed(apiData.data.dungeons.classes.berserker.level), inline: true},
                    {name: "<:archer:852079613042491402> Archer Level", value: toFixed(apiData.data.dungeons.classes.archer.level), inline: true},
                    {name: "<:tank:852079613051666472> Tank Level", value: toFixed(apiData.data.dungeons.classes.tank.level), inline: true},

                    {name: "\u200b", value: "\u200b"},
                    {name: "Floor Completions", value: "\u200b"},

                    {name: "<:bonzo:852111493859115019> Floor 1", value: `Normal: ${toFixed(apiData.data.dungeons.types.catacombs.tier_completions.tier_1)}`, inline: true},
                    {name: "<:scarff:852111493909446686> Floor 2", value: `Normal: ${toFixed(apiData.data.dungeons.types.catacombs.tier_completions.tier_2)}`, inline: true},
                    {name: "<:professor:852111493952176148> Floor 3", value: `Normal: ${toFixed(apiData.data.dungeons.types.catacombs.tier_completions.tier_3)}`, inline: true},
                    {name: "<:thorn:852111493990580284> Floor 4", value: `Normal: ${toFixed(apiData.data.dungeons.types.catacombs.tier_completions.tier_4)}`, inline: true},
                    {name: "<:livid:852111493784666123> Floor 5", value: `Normal: ${toFixed(apiData.data.dungeons.types.catacombs.tier_completions.tier_5)}`, inline: true},
                    {name: "<:sadan:852111495466582017> Floor 6", value: `Normal: ${toFixed(apiData.data.dungeons.types.catacombs.tier_completions.tier_6)}`, inline: true},
                    {name: "<:necron:852111495575765012> Floor 7", value: `Normal: ${toFixed(apiData.data.dungeons.types.catacombs.tier_completions.tier_7)}`, inline: true},
                )
        )
    },
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
    const response = await fetch(`https://hypixel-api.senither.com/v1/profiles/${UUID}/skills?key=${config.apikey}`);
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
