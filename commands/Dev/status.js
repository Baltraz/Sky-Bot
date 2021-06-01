const discord = require('discord.js');
const statuses = ["PLAYING", "LISTENING", "WATCHING", "COMPETING"];
const config = require('../../config.json');

module.exports = {
    name: 'Status',
    description: 'Set the Bots Status. (Baltraz Only)',
    usage: '!status <statusType> <statusMessage>',
    perms: "Dev",
    folder: "Dev",
    execute(client, message, args) {

      if (message.author.id != config.ownerID) return message.channel.send("Can't use this!")
    message.delete();

        if (!args.length) {
            return message.client.user.setActivity()
                .then(message.channel.send(
                    new discord.MessageEmbed()
                        .setDescription(`<a:yes:847468695772987423> Status removed`)
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
                .setDescription(`<a:wait:847471618272002059> You need a message as well as a status type`)
                .setColor('DC143C')
        )

        args.shift();

        message.client.user.setActivity(args.join(' '), { type: status })
            .then(message.channel.send(
                new discord.MessageEmbed()
                    .setDescription(`<a:yes:847468695772987423> Status successfully set to \`${status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() + ' ' + args.join(' ')}\``)
                    .setColor('7CFC00')
            ))
    },
};

function isValidStatus(status) {
    return statuses.includes(status);
}