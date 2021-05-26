const fs = require("fs");
const code = fs.readFileSync('./owner/kill.js', "utf8");

module.exports = {
    execute: (bot, message, args) => {
      message.channel.send(`\`\`\`js\n${code}\`\`\``);
    }
}; 