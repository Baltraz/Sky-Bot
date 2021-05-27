const express = require('express');
const server = express();
const chalk = require('chalk');

server.all('/', (req, res) => {
  res.send(`Wont go Offline!`)
})

function keepAlive() {
  server.listen(3000, () => { console.log(chalk.greenBright("Server is Ready!!" + Date.now())) });
}

module.exports = keepAlive;