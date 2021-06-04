const discord = require('discord.js')
const chalk = require('chalk');

module.exports = {
    name: 'guildCreate',
    execute(guild, bot) {
        console.log(chalk.yellow(`Joined a Guild: ${guild.name}`));
        discordLog(bot,
             new discord.MessageEmbed()
                .setAuthor(bot.user.username, bot.user.avatarURL())
                .setDescription(`Joined a Guild: \`${guild.name}\``)
                .setColor('7CFC00')
                .setTimestamp()
                .addFields(
                  {name: "Member Count of the Server", value: `${guild.memberCount}`},
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