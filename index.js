const discord = require("discord.js");
const bot = new discord.Client();
const { MessageEmbed } = require('discord.js');
const config = require("./config.json");
let f = 0;

// Bot token
bot.login(config.token);

// Send msg in Console when Bot is usable and set status
bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag} and ready to use!`);
  bot.user.setPresence({ activity: { name: "Learning JS" }, });
  console.log(`Loaded ${f} Commands!`)
});

//Send msg in #general once ready to use
bot.on("ready", () => {
  bot.channels.cache.get('843590952920940565').send('Rebooted and Ready to Use!');
});

// Command loader
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
        message.reply('there was an error trying to execute that command!');
    }
});