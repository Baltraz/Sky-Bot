module.exports = {
	name: 'test',
	description: 'testing command!',
	async execute(bot, message, args) {
		if(message.author.bot) return;
    if(message.content === 'help'){ 
        message.delete();
        let embed = new discord.MessageEmbed()
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
          ("Made by Baltraz#4874"),
        )
      
      // Auto delete Embed after 2 Minutes to reduce Channel Spam
      const sentMessage = await message.channel.send(embed)
      setTimeout(() => sentMessage.delete(), 120_000);  
    }
	},
};