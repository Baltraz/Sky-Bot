const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env['token'];
const { Client, MessageEmbed } = require('discord.js');

// Bot token
client.login(token);

// Send msg in Console when Bot is usable and set status
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag} and ready to use!`);
  client.user.setPresence({ activity: { name: "Learning JS" }, });
});

//Send msg in #general once ready to use
client.on("ready", () => {
  client.channels.cache.get('826437327374385166').send('Rebooted and Ready to Use!');
});

//Spamping command .sp <number of pings> <delete pings y/n> @User
client.on("message", message => {
  if (!message.guild) return;
  if (message.content.startsWith(".sp")) {
    message.delete();
    let times = 1;
    let delet = false;
    try {
      times = parseInt(message.content.split(" ")[1]);
      delet = message.content.split(" ")[2] == "y";
    } catch (error) {}
    const member = message.mentions.members.first();
    for (let i = 0; i < times; i++)
      message.channel.send(`Pinged ${member}`).then(m => {
        if (delet) {
          setTimeout(() => {
            m.delete();
          }, times * 25000);
        }
      });
  }
});

// Keep the bot running.
client.on("message", function(message) {
  if (message.content === ".online") {
    const interval = setInterval(function() {
      client.channels.cache.get('843760730494861364').send('Stay online!');
    }, 1 * 240000);
  }
});

client.on("message", async message =>{

    if(message.author.bot) return;
    if(message.content === '.help'){ 
        message.delete();
        let embed = new Discord.MessageEmbed()
        .setTitle("Command List")
        .setDescription("This is how to use all the commands. Any questions? DM <@570267487393021969>")
        .setColor('ff0000')
        .addFields(
          {name: ".sp", value: "Usage: .sp <Amount of Pings> <Delete Pings y/n> <User to Ping>", inline: false},
        )
        .addFields(
          {name: ".online", value: "Usage: .online (Sends a Message in <#843760730494861364> every 4 Minutes to keep the Bot online).", inline: false},
        )
        .setFooter(
          ("Made by Baltraz#4874 and firebxll#0001"),
        )
      
      // Auto delete Embed after 2 Minutes to reduce Channel Spam
      const sentMessage = await message.channel.send(embed)
      setTimeout(() => sentMessage.delete(), 120_000);  
    }
    });