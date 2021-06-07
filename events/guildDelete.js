const discord = require('discord.js')
const chalk = require('chalk');

module.exports = {
    name: 'guildDelete',
    execute(guild, bot) {
        discordLog(bot,
             new discord.MessageEmbed()
                .setAuthor(bot.user.username, bot.user.avatarURL())
                .setDescription(`Left a Guild: \`${guild.name}\``)
                .setColor('RED')
                .setTimestamp()
                .addFields(
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