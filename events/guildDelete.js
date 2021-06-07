const discord = require('discord.js')
const chalk = require('chalk');

module.exports = {
    name: 'guildDelete',
    execute(guild, client) {
        discordLog(client,
             new discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.avatarURL())
                .setDescription(`Left a Guild: \`${guild.name}\``)
                .setColor('RED')
                .setTimestamp()
                .addFields(
                  {name: "Total Server Count Now", value: `${client.guilds.cache.size}`},
                  {name: "Total User Count Now", value: `${client.users.cache.size}`})
        )
    }
};

function discordLog(client, embed) {
    delete require.cache[require.resolve('../config.json')];
    const config = require('../config.json');

    client.channels.fetch(config.joinlog)
        .then(channel => channel.send(embed))
        .catch(console.error)
}