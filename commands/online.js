module.exports = {
    "execute": (bot, message, args) => {
  if (message.content === "online") {
    const interval = setInterval(function() {
      bot.channels.cache.get('844196712084275210').send('Stay online!');
    }, 1 * 2000);
  }
}
};