module.exports = {
    "execute": (bot, message, args) => {
  if (!message.guild) return;
  if (message.content.startsWith("sp")) {
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
}
};