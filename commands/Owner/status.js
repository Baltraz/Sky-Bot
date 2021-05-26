const discord = require('discord.js');
const statuses = ["PLAYING", "LISTENING", "WATCHING", "COMPETING"];
const config = require('../../config.json');

module.exports = {
    name: 'Status',
    description: 'Set the Bots Status.',
    usage: '!status <statusType> <statusMessage>',
    execute(client, message, args) {

      if (message.author.id != config.ownerID) return message.channel.send("Can't use this!")
    message.delete();

        if (!args.length) {
            return message.client.user.setActivity()
                .then(message.channel.send(
                    new discord.MessageEmbed()
                        .setDescription(`Status removed`)
                        .setColor('7CFC00')
                ))
        }

        const status = args[0].toUpperCase();

        if (!isValidStatus(status)) return message.channel.send(
            new discord.MessageEmbed()
                .setDescription(`Invalid status type`)
                .addField("Valid types:", statuses.join('\n'))
                .setColor('DC143C')
        );

        if (args.length == 1) return message.channel.send(
            new discord.MessageEmbed()
                .setDescription(`You need a message as well as a status type`)
                .setColor('DC143C')
        )

        args.shift();

        message.client.user.setActivity(args.join(' '), { type: status })
            .then(message.channel.send(
                new discord.MessageEmbed()
                    .setDescription(`Status successfully set to \`${status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() + ' ' + args.join(' ')}\``)
                    .setColor('7CFC00')
            ))
    },
};

function isValidStatus(status) {
    return statuses.includes(status);
}