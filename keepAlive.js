const express = require('express');
const server = express();
const chalk = require('chalk');

server.all('/', (req, res) => {
  res.send(`These Nuts in your Mouth Stupid bitch.`)
})

function keepAlive() {
  server.listen(3000, () => { console.log(chalk.greenBright("Server is Ready!!" + Date.now())) });
}

module.exports = keepAlive;