const Discord = require('discord.js');
const fetch = require('node-fetch');
const apikey = process.env['apikey']



module.exports = {
  name: "Slayer",
  description: "Shows the Users Slayer Data.",
  usage: "slayer (IGN)",
  perms: "None",
  folder: "Skyblock",
    async execute(client, message, args) {


      if (!args[0]) {
            var ign = message.member.displayName;
        } else {
            if (message.mentions.members.first()) {
                var ign = message.mentions.members.first().displayName;
            }
            else var ign = args[0];
        } // Gets IGN

        var method = 'save';
        if (args[1]) method = args[1];

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

       // ign = await getTrueIgn(ign);

        // At this point we know its a valid IGN, but not if it has skyblock profiles
        const apiData = await getApiData(ign, method); // Gets all skyblock player data from Senither's Hypixel API Facade

		if (apiData.status != 200) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setDescription(apiData.reason)
					.setColor('DC143C')
					.setTimestamp()
			)
		}

        // IGN is valid and player has skyblock profiles

        if (apiData.data.skills.apiEnabled == false) return message.channel.send(
            new Discord.MessageEmbed()
                .setAuthor(ign, `https://cravatar.eu/helmavatar/${ign}/600.png`, `https://sky.shiiyu.moe/stats/${ign}`)
                .setDescription('You currently have skills API disabled, please enable it in the skyblock menu and try again')
                .setColor('DC143C')
                .setTimestamp()
        )

        return message.channel.send( // EDIT THIS BIT
            new Discord.MessageEmbed()
                .setColor('7CFC00')
                .setAuthor(ign, `https://cravatar.eu/helmavatar/${ign}/600.png`, `http://sky.shiiyu.moe/stats/${ign}`)
                .setFooter(`${ign}'s Total Slayer EXP: ` + apiData.data.slayers.total_experience)
                .addFields(
                    {name: `Slayer Data for ${ign}`, value: getSlayers(apiData), inline:true},
                )
                
        )
    },
};

function getSlayers(apiData) {
  const rxp = apiData.data.slayers.bosses.revenant.experience
  const txp = apiData.data.slayers.bosses.tarantula.experience
  const sxp = apiData.data.slayers.bosses.sven.experience
  const exp = apiData.data.slayers.bosses.enderman.experience
  const rkills = apiData.data.slayers.bosses.revenant.kills.tier_4 + apiData.data.slayers.bosses.revenant.kills.tier_5 + apiData.data.slayers.bosses.revenant.kills.tier_1 + apiData.data.slayers.bosses.revenant.kills.tier_2 + apiData.data.slayers.bosses.revenant.kills.tier_3
  const tkills = apiData.data.slayers.bosses.tarantula.kills.tier_1 + apiData.data.slayers.bosses.tarantula.kills.tier_2 + apiData.data.slayers.bosses.tarantula.kills.tier_3 + apiData.data.slayers.bosses.tarantula.kills.tier_4
  const skills = apiData.data.slayers.bosses.sven.kills.tier_1 + apiData.data.slayers.bosses.sven.kills.tier_2 + apiData.data.slayers.bosses.sven.kills.tier_3 + apiData.data.slayers.bosses.sven.kills.tier_4
  const ekills = apiData.data.slayers.bosses.enderman.kills.tier_1 + apiData.data.slayers.bosses.enderman.kills.tier_2 + apiData.data.slayers.bosses.enderman.kills.tier_3 + apiData.data.slayers.bosses.enderman.kills.tier_4

  return[
    `<:rev:852892164559732806> **Revenant**`,
    `Experience: ${rxp}, Kills: ${rkills}`,
    `<:tara:852892164392222740> **Tarantula**`,
    `Experience: ${txp}, Kills: ${tkills}`,
    `<:sven:852892164299423754> **Sven**`,
    `Experience: ${sxp}, Kills: ${skills}`,
    `<:eman:854253314747924511> **Enderman**`,
    `Experience: ${exp}, Kills: ${ekills}`
  ].join('\n');

}

async function getUUID(ign) {
	const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${ign}`);
	const result = await response.json();
	return result.id;
}

async function getApiData(ign, method) {
    delete require.cache[require.resolve('../../config.json')];
    const config = require('../../config.json');

    const UUID = await getUUID(ign);
    const response = await fetch(`https://hypixel-api.senither.com/v1/profiles/${UUID}/${method}?key=${apikey}`);
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