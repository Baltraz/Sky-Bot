const Discord = require('discord.js');
const axios = require("axios");
const config = require("../../config.json")


module.exports = {
  name: "Hypixel",
  description: "Shows Info about the Hypixel profile of the user",
  usage: "hypixel (IGN)",
  perms: "None",
  folder: "WIP",
    execute: (client, message, args) => {
    let mcname = args[0] 
    if(!mcname) return message.channel.send("You didn't specify a user")

    axios.get(`https://some-random-api.ml/mc?username=${mcname}`) //Minecraft UUID api
    .then((res) => {
        var UUID =  res.data.uuid
        axios.get(`https://api.hypixel.net/player?uuid=${UUID}&key=${config.apikey}`) //General api = network stats
        .then((resp) => {
            const unixFirstLogin = resp.data.player.firstLogin
            var firstLogin = new Date(unixFirstLogin) //Should make a date but im not sure LOL
            const unixLastLogin = resp.data.player.lastLogin
            var lastLogin = new Date(unixLastLogin)
            var displayName = resp.data.player.displayname
            let packRank = resp.data.player.newPackageRank
            let rank = resp.data.player.rank
            let color = resp.data.player.rankPlusColor
            if(!color) color = "RED"
            if(!rank) rank = resp.data.player.newPackageRank
            if(!packRank) rank = "Default"
            var rankFixed = rank.replace("_", "").replace("PLUS", "+")
            var networkExp = resp.data.player.networkExp 
            var level = (Math.sqrt((2 * networkExp) + 30625) / 50) - 2.5
            var karma = resp.data.player.karma
            axios.get(`https://api.hypixel.net/status?uuid=${UUID}&key=${config.apikey}`) //Status api checks if player is online
           .then((response) => {  
                let session = response.data.session.online
                let emoji = ''
                if(session === false) emoji = ":x:"
                if(session === true) emoji = ":white_check_mark:"
                if(session === true) {
                    var gametype = response.data.session.gameType
                }
                let gameo = ""
                if(gametype) gameo = `\nPlaying: ${gametype}`
                axios.get(`https://api.hypixel.net/guild?player=${UUID}&key=${config.apikey}`) //Guild api
                .then((respo) => {
                    let guild = respo.data.guild
                    if(!guild) {
                        var embed = new Discord.MessageEmbed()
                        .setAuthor(displayName, `https://cravatar.eu/helmavatar/${displayName}/600.png`, (`https://plancke.io/hypixel/player/stats/${displayName}`))
                        .setTitle(`**${displayName}'s Hypixel Stats**`, )
                        .addFields(
                            {name: "**Level**", value: `**Network Level**: ${level}\n**Total Exp**: ${networkExp}\n**Total Karma**: ${karma}`, inline: true}, {name: "**Rank**", value: `${rankFixed}`, inline: true},
                            {name: "**Guild**", value: `Player is not in a guild`, inline: true}, {name: '**Status**', value: `${emoji}${gameo}`, inline: true},
                            {name: "**First Login**", value: firstLogin, inline: true}, {name: '**Last Login**', value: lastLogin, inline: true}
                        )
                        .setColor(color)
                    }
                    else if(guild) {
                        guild = ""
                    var guildName = respo.data.guild.name
                    const unixGuildCreated = respo.data.guild.created
                    var guildCreated = new Date(unixGuildCreated)
                
                    //Now we have all data so we can make a embed
                    var embed = new Discord.MessageEmbed()
                    .setAuthor([displayName](`https://plancke.io/hypixel/player/stats/${displayName}`))
                    .setTitle(`**${displayName}'s Hypixel Stats**`, )
                    .addFields(
                        {name: "**Level**", value: `**Network Level**: ${level}\n**Total Exp**: ${networkExp}\n**Total Karma**: ${karma}`, inline: true}, {name: "**Rank**", value: `${rankFixed}`, inline: true},
                        {name: "**Guild**", value: `**Guild Name**: ${guildName}\n**Created At**: ${guildCreated}`, inline: true}, {name: '**Status**', value: `${emoji}${gameo}`, inline: true},
                        {name: "**First Login**", value: firstLogin, inline: true}, {name: '**Last Login**', value: lastLogin, inline: true}
                    )
                    .setColor(color)}
                    message.channel.send(embed)
                })
            })
        })
    })

    }
};