const Discord = require('discord.js');
const fs = require('fs')

module.exports = {
    name: 'Help',
    usage: '!help [command]',
    description: 'Shows Information about all the Commands from Sky Bot',
    perms: "None",
    execute(client, message, args) {
        if (!args.length) {
            delete require.cache[require.resolve('../../package.json')];
            const package = require('../../package.json');
    
            delete require.cache[require.resolve('../../config.json')];
            const config = require('../../config.json');
    
            const commandFolders = fs.readdirSync('./commands');
    
            let embed = new Discord.MessageEmbed()
                .setAuthor(`Sky Bot Help`)
                .setDescription(`Use \`!help (Command Name)\` for a more detailed view on a Command.\n(Needed) <Optional>`)
                .setColor('ORANGE')

            for (const folder of commandFolders) {
                let descriptions = [];
                const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    const command = require(`../${folder}/${file}`);
                    let currentCommand = [];
                    currentCommand.push(`\`${command.name.charAt(0).toUpperCase() + command.name.slice(1)}\``);
                    currentCommand.push('-');
                    currentCommand.push(command.description);
                    descriptions.push(currentCommand.join(' '));
                }
                embed.addField((folder.charAt(0).toUpperCase() + folder.slice(1)), descriptions.join('\n'))
            }

            return message.channel.send(embed)
        } // all commands

        const name = args[0].toLowerCase();
        const command = message.client.commands.get(name);

        if (!command) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setDescription(`Command \`${name}\` wasn\'t found.\nUse \`!help\` to see all the Valid Commands. `)
                .setColor('RED')
            );
        }

        let embed = new Discord.MessageEmbed()
                .setAuthor(`Help -> ${command.folder} -> ${command.name}`)
                .setColor('616060')

        embed.setDescription(`${command.description}`)
        embed.addField('Permissions Needed to Execute:', `${command.perms}`)
        embed.addField('Usage:', `${command.usage}`)

        return message.channel.send(embed)
                // individual commands
    },
};