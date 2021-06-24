const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const keepAlive = require('./keepAlive.js');
const fs = require('fs');
const chalk = require('chalk');
const mySecret = process.env['token'];
let c = 0;
let e = 0;

const prefix = require('discord-prefix');
let defaultPrefix = '!';

// Bot token login
client.login(mySecret);

// Send msg in Console when Bot is usable and set status
client.on('ready', () => {
  console.log(chalk.greenBright(`Logged in as ${client.user.username}!`));
  console.log(chalk.greenBright(`Loaded ${c} Commands and ${e} Events!`));
 client.user.setActivity(`${client.users.cache.size} Members and ${client.guilds.cache.size} Servers`, { type: 'WATCHING' });
});


/*//cycles status
client.on('ready' , () => {

  const arrayOfStatus = [ 
  `${client.guilds.cache.size} Servers`, 
  `${client.users.cache.size} Users`, 
  `help for help`, 
  `invite to Invite me!`
  ];

let index = 0;
setInterval(() => {
  if (index === arrayOfStatus.length) index
  const status = arrayOfStatus[Math.floor(Math.random()*arrayOfStatus.length)]
  client.user.setActivity(status , {type : 'WATCHING'});
  index++;
}, 30000); 
});*/

//Replies with the Prefix when Bot is mentioned
client.on('message', message => {

 if (message.author.bot) return;
  let guildPrefixx = prefix.getPrefix(message.guild.id);
  if (!guildPrefixx) guildPrefixx = defaultPrefix;
  const bottag = message.mentions.users.first();
  if (bottag === client.user) { (message.channel.send(`My Prefix is \`${guildPrefixx}\``)) 
  return; }

});

//dont judge me i was threatened to
client.on('message', message => {

if(message.content === '!mollyqt') {
        if(message.author.id === '444806963415482369') 



        message.channel.send(
            new Discord.MessageEmbed()
                .setDescription(":flushed:")
                .setImage('https://cdn.discordapp.com/attachments/836267623485407283/844622340545052702/image0.png')
                .setTimestamp()
        )
}

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
  let guildPrefix = prefix.getPrefix(message.guild.id);
  if (!guildPrefix) guildPrefix = defaultPrefix;
  if (!message.content.startsWith(guildPrefix) || message.author.bot) return;

  const args = message.content
    .slice(guildPrefix.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(client, message, args);
    client.channels.fetch(config.usedcommand).then(channel => channel.send(`${command} used in <#${message.channel.id}>.\nServer: ${message.guild.name}`))
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