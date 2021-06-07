const discord = require('discord.js')
const chalk = require('chalk');

module.exports = {
    name: 'guildCreate',
    execute(guild, bot) {
        discordLog(bot,
             new discord.MessageEmbed()
                .setAuthor(bot.user.username, bot.user.avatarURL())
                .setDescription(`Joined a Guild: \`${guild.name}\`\n${guild.id}`)
                .setColor('7CFC00')
                .setTimestamp()
                .addFields(
                  {name: "Guild Owner", value: `${guild.owner} [${guild.owner.user.tag} (${guild.owner.id})]`},
                  {name: "Member Count of the Server", value: `${guild.memberCount}`},
                  {name: "Bot Count of the Server", value: `${guild.members.cache.filter(u => u.user.bot).size}`},
                 {name: "Total Server Count Now", value: `${bot.guilds.cache.size}`},
                  {name: "Total User Count Now", value: `${bot.users.cache.size}`})
        )
    }
};

function discordLog(bot, embed) {
    delete require.cache[require.resolve('../config.json')];
    const config = require('../config.json');

    bot.channels.fetch(config.joinlog)
        .then(channel => channel.send(embed))
        .catch(console.error)
}