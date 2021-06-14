const Discord = require('discord.js');

module.exports = {
    name: 'hi',
    usage: 'hi',
    description: 'Says hi!',
    execute(client, message, args) {
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('o/')
                .setDescription(`Hi ${message.author} :heart:`)
                .setColor(Math.floor(Math.random() * 16777215).toString(16))
        )
    },
};