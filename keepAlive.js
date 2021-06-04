const express = require('express');
const server = express();
const chalk = require('chalk');

server.all('/', (req, res) => {
  res.send(`
<meta property="og:description" 
  content="A Moderation/Fun/Multi Functional Discord Bot." />
<meta property="og:title" content="Sky Bot" />
  <a href="https://discord.gg/Ca6XpTRQaR">Sky Bot Support Server</a> To ask for Help if something isn't working as intended or a Bug was found.
  <br>
  <a href="https://discord.com/oauth2/authorize?client_id=839835292785704980&scope=bot&permissions=402975831">Sky Bot Invite Link</a>
  <br><br><br>
  <a href="https://discord.com/oauth2/authorize?client_id=839494994246762507&permissions=1879418945&scope=bot">Sky Stats Invite Link (Friends Bot)</a>`)
})

function keepAlive() {
  server.listen(3000, () => { console.log(chalk.greenBright("Server is Ready!!" + Date.now())) });
}

module.exports = keepAlive;