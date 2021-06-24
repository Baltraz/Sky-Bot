const Discord = require('discord.js');


module.exports = {
    name: 'Userinfo',
    usage: 'userinfo <user>',
    description: "Shows info about the User",
    perms: "None",
    folder: "QOL",
    async execute(client, message, args) {
        let user = message.member.user
        const tag = user.tag
        const avatar = user.displayAvatarURL()
        const userID = user.id
        const discordJoinDate = user.createdAt.toLocaleDateString()
        const userpresence = user.presence.status //Offline or online
        if(userpresence === "online") { var activity = user.presence.activities[0].state } else {
          var activity = 'Offline'
        }
        let web = ''
        if(user.presence.clientStatus) {
          if(user.presence.clientStatus.web) web = 'PC'
          else if(user.presence.clientStatus.mobile) web = "Mobile"
        } else if (user.presence.clientStatus === null) web = "offline"

      
        const joinedServer = message.member.guild.joinedAt.toLocaleDateString()
        const badges = user.flags.toArray()
        let partner = ""
        let empl = ""
        let events = ""
        let bughunter = ""
        let bravery = ""
        let brilliance = ""
        let balance = ""
        let earlysupporter = ""
        let teamuser = ""
        let bughunter2 = ''
        let developer = ''
        if(badges.includes("DISCORD_PARTNER")) partner = "<:partner:855414536264876033>, "
        if(badges.includes("DISCORD_EMPLOYEE")) empl = "<:discord_staff:855414296975507487>, "
        if(badges.includes("HYPESQUAD_EVENTS")) events = '<:events:856514436847501313>, '
        if(badges.includes("BUGHUNTER_LEVEL_1")) bughunter = "<:bughunter:856515040868696104>, "
        if(badges.includes("HOUSE_BRAVERY")) bravery = "<:bravery:856515826218958858>"
        if(badges.includes("HOUSE_BRILLIANCE")) brilliance ='<:brilliance:856516183939612742>'
        if(badges.includes("HOUSE_BALANCE")) balance = "<:balance:856516404562624512>"
        if(badges.includes("EARLY_SUPPORTER")) earlysupporter = "<:earlysupporter:856517006592573450>, "
        if(badges.includes("BUGHUNTER_LEVEL_2")) bughunter2 = "<:BugHunterLvl2:856517850884603935>, "
        if(badges.includes("TEAM_USER")) teamuser = ""
        if(badges.includes("VERIFIED_DEVELOPER")) developer = "<:verifieddev:848830303472189461>, "
        if(!badges) balance = "user has no badges"

        const embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, avatar, "https://discord.id")
        .addFields(
          {name: "Server Join Date", value: joinedServer, inline: true},
          {name: "Discord Join Date", value: discordJoinDate, inline: true},
          {name: "Badges", value: "" + empl + events + partner + bughunter2 + bughunter + developer + earlysupporter + bravery + brilliance + balance, inline:false} ,
          {name: 'Status', value: userpresence + `\n '${activity}'`, inline:true},
          {name: 'Device', value: web, inline:true}
        )
        .setColor("GREEN")
        message.channel.send(embed)
    }
}