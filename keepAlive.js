const express = require('express');
const server = express();

server.all('/', (req, res) => {
  res.send(`These Nuts in your Mouth Stupid bitch.`)
})

function keepAlive() {
  server.listen(3000, () => { console.log("Server is Ready!!" + Date.now()) });
}

module.exports = keepAlive;