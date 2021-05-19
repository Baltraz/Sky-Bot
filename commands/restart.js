const fiscord = require('discord.js');
const config = require('../config.json');

module.exports = {
    execute: (bot, message, args) => {
       bot.destroy().then(() => {
          bot.login('config.token'); //im here you gu
        });
    }};
