const discord = require("discord.js");
const bot = new discord.Client();
const config = require("./config.json");
const keepAlive = require('./keepAlive.js');
const fs = require('fs');
const chalk = require('chalk');
let f = 0;

// Bot token
bot.login(config.token);


// Send msg in Console when Bot is usable and set status
bot.on("ready", () => {
  console.log(chalk.greenBright(`Logged in as ${bot.user.username}!`));
  console.log(chalk.greenBright(`Loaded ${f} Commands!`));
});


//Replies with the Preifx when Bot is mentioned
bot.on("message", message => {
  if (message.author.bot) return false;

  if (message.mentions.has(bot.user.id)) {
    message.channel.send(`My prefix is \`${config.prefix}\`.`);
  };
});


//Command Loader
bot.commands = new discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    f += 1;
    bot.commands.set(command.name.toLowerCase(), command);
  }
}


//Command Handler
bot.on('message', async message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(bot, message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an Error trying to execute that Command!');
  }
});


//Loophole to keep the Bot running
keepAlive();


/* how to export commands
const discord = require('discord.js');

module.exports = {
    execute: (bot, message, args) => {
      putmycodehere
    }
};
*/