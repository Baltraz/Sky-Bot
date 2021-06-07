const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const keepAlive = require('./keepAlive.js');
const fs = require('fs');
const chalk = require('chalk');
const mySecret = process.env['token'];
let c = 0;
let e = 0;

// Bot token login
client.login(mySecret);

// Send msg in Console when Bot is usable and set status
client.on('ready', () => {
	console.log(chalk.greenBright(`Logged in as ${client.user.username}!`));
	console.log(chalk.greenBright(`Loaded ${c} Commands and ${e} Events!`));
});

//Replies with the Preifx when Bot is mentioned
client.on('message', message => {
	if (message.author.bot) return false;
const args = message.content
if (args.slice(0) === "<@839835292785704980>") return (message.channel.send(`My Prefix is \`${config.prefix}\``))
});

//Command Loader
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands/${folder}`)
		.filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		c += 1;
		client.commands.set(command.name.toLowerCase(), command);
	}
}

//Command Handler
client.on('message', async message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content
		.slice(config.prefix.length)
		.trim()
		.split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an Error trying to execute that Command!');
	}
});

//Event Handler
const eventFiles = fs
	.readdirSync('./events')
	.filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
    e += 1;
	}
}

//Loophole to keep the Bot running
keepAlive();

/* how to export commands
const Discord = require('discord.js');
module.exports = {
  name: "Name",
  description: "Description",
  usage: "Usage",
  perms: "Permissions Needed",
  folder: "folder",
    execute: (client, message, args) => {
      putmycodehere
    }
};
*/

/*
module.exports = {
	name: 'name',
	execute(client) {
    code here
	}
};
*/