const discord = require("discord.js");
const bot = new discord.Client();
const config = require("./config.json");
const keepAlive = require('./keepAlive.js');
let f = 0;

// Bot token
bot.login(config.token);

// Send msg in Console when Bot is usable and set status
bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag} and ready to use!`);
  bot.user.setPresence({ activity: { name: "Learning JS" }, });
  console.log(`Loaded ${f} Commands!`)
});

/*//Log all messages it sees in a defined channel
bot.on("message", message => {
  if (message.author.id == bot.user.id) return;
  if (message.guild.id !== config.guildID) return; //Change in config file
  const embed = new discord.MessageEmbed()
        .setDescription(`${message.author}`)
        .setColor('ffff00')
        .addFields(
          {name: `\u200b`, value: `${message.content} in ${message.channel}`, inline: false})
        .setFooter(`ID: ${message.author.id}`)
  bot.channels.cache.get(config.logID).send(embed) //Change in config file
});*/



bot.on("message", message => {
    if (message.author.bot) return false;

    if (message.mentions.has(bot.user.id)) {
        message.channel.send(`My prefix is \`${config.prefix}\`.`);
    };
});

//Command Loader
bot.commands = new discord.Collection();
const commandFiles = require("fs").readdirSync("./commands");

commandFiles.forEach(file => {
    if (!file.includes(".js")) return;
    file = file.replace(".js", "");
    f++;
    bot.commands.set(file, require(`./commands/${file}`));
}); 


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

keepAlive();

/* how to export commands
const discord = require('discord.js');

module.exports = {
    execute: (bot, message, args) => {
      putmycodehere
    }
};*/