const discord = require('discord.js')
const chalk = require('chalk');

module.exports = {
    name: 'guildCreate',
    execute(guild, client) {
        console.log(chalk.yellow(`Joined a Guild: ${guild.name}`));
        discordLog(client,
             new discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.avatarURL())
                .setDescription(`Joined a Guild: \`${guild.name}\``)
                .setColor('7CFC00')
                .setTimestamp()
                .addFields(
                  {name: "Member Count of the Server", value: `${guild.memberCount}`},
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
