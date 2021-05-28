
const config = require('./config.json')

module.exports = (bpt, aliases, callback) => {
  if (typeof aliases === 'string') {
    aliases = [aliases]
  }

  bot.on('message', (message) => {
    const { content } = message

    aliases.forEach((alias) => {
      const command = `${config.prefix}${alias}`

      if (content.startsWith(`${command} `) || content === command) {
        console.log(`Running the command ${command}`)
        callback(message)
      }
    })
  })
}