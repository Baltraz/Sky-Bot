const Discord = require('discord.js');
const fetch = require('node-fetch');
const apikey = process.env['apikey']
const pms = require('pretty-ms')



module.exports = {
    name: 'Dungeons',
    usage: 'dungeons (IGN)',
    description: "Show Dungeons Stats for the mentioned User",
    async execute(client, message, args) {

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


        const waitembed = new Discord.MessageEmbed()
        .setDescription('Checking for Player Data . . .')
        .setFooter('If i don\'t respond within 10 Seconds then theres an Error at the Hypixel API\nTry again later pls.')
        .setColor('ORANGE')

        const waitingembed = await message.channel.send(waitembed)


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


        let tier7 = apiData.data.dungeons.types.catacombs.tier_completions.tier_7
        if(!tier7) tier7 = 0
        
        let tier6 = apiData.data.dungeons.types.catacombs.tier_completions.tier_6
        if(!tier6) tier6 = 0

        let tier5 = apiData.data.dungeons.types.catacombs.tier_completions.tier_5
        if(!tier5) tier5 = 0

        let tier4 = apiData.data.dungeons.types.catacombs.tier_completions.tier_4
        if(!tier4) tier4 = 0

        let tier3 = apiData.data.dungeons.types.catacombs.tier_completions.tier_3
        if(!tier3) tier3 = 0

        let tier2 = apiData.data.dungeons.types.catacombs.tier_completions.tier_2
        if(!tier2) tier2 = 0

        let tier1 = apiData.data.dungeons.types.catacombs.tier_completions.tier_1
        if(!tier1) tier1 = 0

        let value1 = apiData.data.dungeons.types.catacombs.best_score.tier_1
        if(!value1) value1 = 0
        if(value1) value1 = apiData.data.dungeons.types.catacombs.best_score.tier_1.value

        let value2 = apiData.data.dungeons.types.catacombs.best_score.tier_2
        if(!value2) value2 = 0
        if(value2) value2 = apiData.data.dungeons.types.catacombs.best_score.tier_2.value

        let value3 = apiData.data.dungeons.types.catacombs.best_score.tier_3
        if(!value3) value3 = 0
        if(value3) value3 = apiData.data.dungeons.types.catacombs.best_score.tier_3.value

        let value4 = apiData.data.dungeons.types.catacombs.best_score.tier_4
        if(!value4) value4 = 0
        if(value4) value4 = apiData.data.dungeons.types.catacombs.best_score.tier_4.value

        let value5 = apiData.data.dungeons.types.catacombs.best_score.tier_5
        if(!value5) value5 = 0
        if(value5) value5 = apiData.data.dungeons.types.catacombs.best_score.tier_5.value

        let value6 = apiData.data.dungeons.types.catacombs.best_score.tier_6
        if(!value6) value6 = 0
        if(value6) value6 = apiData.data.dungeons.types.catacombs.best_score.tier_6.value

        let value7 = apiData.data.dungeons.types.catacombs.best_score.tier_7
        if(!value7) value7 = 0
        if(value7) value7 = apiData.data.dungeons.types.catacombs.best_score.tier_7.value

        let time2 = apiData.data.dungeons.types.catacombs.fastest_time_s_plus.tier_2
        if(!time2) time2 = 0
        if(time2) time2 = apiData.data.dungeons.types.catacombs.fastest_time_s_plus.tier_2.seconds
        let min2 = Math.floor(time2 / 60)
        let sec2 = Math.floor(time2 % 60)

        let time4 = apiData.data.dungeons.types.catacombs.fastest_time_s_plus.tier_4
        if(!time4) time4 = 0
        if(time4) time4 = apiData.data.dungeons.types.catacombs.fastest_time_s_plus.tier_4.seconds
        let min4 = Math.floor(time4 / 60)
        let sec4 = Math.floor(time4 % 60)

        let time5 = apiData.data.dungeons.types.catacombs.fastest_time_s_plus.tier_5
        if(!time5) time5 = 0
        if(time5) time5 = apiData.data.dungeons.types.catacombs.fastest_time_s_plus.tier_5.seconds
        let min5 = Math.floor(time5 / 60)
        let sec5 = Math.floor(time5 % 60)

        let time6 = apiData.data.dungeons.types.catacombs.fastest_time_s_plus.tier_6
        if(!time6) time6 = 0
        if(time6) time6 = apiData.data.dungeons.types.catacombs.fastest_time_s_plus.tier_6.seconds
        let min6 = Math.floor(time6 / 60)
        let sec6 = Math.floor(time6 % 60)

        let time7 = apiData.data.dungeons.types.catacombs.fastest_time_s_plus.tier_7
        if(!time7) time7 = 0
        if(time7) time7 = apiData.data.dungeons.types.catacombs.fastest_time_s_plus.tier_7.seconds
        let min7 = Math.floor(time7 / 60)
        let sec7 = Math.floor(time7 % 60)



             const foundresult = new Discord.MessageEmbed()  
                .setTitle(`Dungeons Stats`)
                .setColor('7CFC00')
                .setFooter('Click their Name to view their SkyShiiyu')
                .setAuthor(ign, `https://cravatar.eu/helmavatar/${ign}/600.png`, `http://sky.shiiyu.moe/stats/${ign}`)
                .setDescription(`Catacombs Level: **${toFixed(apiData.data.dungeons.types.catacombs.level)}**\nSecrets Count: **${toFixed(apiData.data.dungeons.secrets_found)}**`)
                .addFields(
                    {name: "<:healer:852079613001990175> Healer Level", value: toFixed(apiData.data.dungeons.classes.healer.level), inline: true},
                    {name: "<:mage:852079612699607072> Mage Level", value: toFixed(apiData.data.dungeons.classes.mage.level), inline: true},
                    {name: "<:berserker:852079613052059658> Berserker Level", value: toFixed(apiData.data.dungeons.classes.berserker.level), inline: true},
                    {name: "<:archer:852079613042491402> Archer Level", value: toFixed(apiData.data.dungeons.classes.archer.level), inline: true},
                    {name: "<:tank:852079613051666472> Tank Level", value: toFixed(apiData.data.dungeons.classes.tank.level), inline: true},

                    {name: "\u200b", value: "**Floor Completions**"},


                    {name: "<:bonzo:852111493859115019> Floor 1", value: `Normal: **${tier1}**\nFastest S+: **?**\nBest Score: **${value1}**`, inline: true},
                    {name: "<:scarff:852111493909446686> Floor 2", value: `Normal: **${tier2}**\nFastest S+: **${min2}m ${sec2}s**\nBest Score: **${value2}**`, inline: true},
                    {name: "<:professor:852111493952176148> Floor 3", value: `Normal: **${tier3}**\nFastest S+: **?**\nBest Score: **${value3}**`, inline: true},
                    {name: "<:thorn:852111493990580284> Floor 4", value: `Normal: **${tier4}**\nFastest S+: **${min4}m ${sec4}s**\nBest Score: **${value4}**`, inline: true},
                    {name: "<:livid:852111493784666123> Floor 5", value: `Normal: **${tier5}**\nFastest S+: **${min5}m ${sec5}s**\nBest Score: **${value5}**`, inline: true},
                    {name: "<:sadan:852111495466582017> Floor 6", value: `Normal: **${tier6}**\nFastest S+: **${min6}m ${sec6}s**\nBest Score: **${value6}**`, inline: true},
                    {name: "<:necron:852111495575765012> Floor 7", value: `Normal: **${tier7}**\nFastest S+: **${min7}m ${sec7}s**\nBest Score: **${value7}**`, inline: true},
                )
              waitingembed.edit(foundresult)
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
    const response = await fetch(`https://hypixel-api.senither.com/v1/profiles/${UUID}/skills?key=${apikey}`);
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