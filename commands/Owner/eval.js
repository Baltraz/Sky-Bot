const discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Eval",
  description: "Allows execution of Code from Discord. (Baltraz Only)",
  usage: "!eval <command snipet>",
  perms: "BotOwner",
  execute: (bot, message, args) => {
    if (message.author.id !== config.ownerID) return message.channel.send("Can't use this!")
    function clean(text) {
      if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
        return text;
    }

    if (message.content.startsWith(config.prefix + "eval")) {
      try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), { code: "xl" });
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
  }
};