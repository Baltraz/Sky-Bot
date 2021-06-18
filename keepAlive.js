const express = require('express');
const server = express();
const chalk = require('chalk');

server.all('/', (req, res) => {
  res.send(`<meta property="og:description"
  content="A Moderation/Fun/Multi Functional Discord Bot." />
<meta property="og:title" content="Sky Bot" />
  <style>
body {
  background: rgb(255, 255, 255);
  background-image: url("https://cdn.discordapp.com/attachments/848133914971209728/855088261785583636/ranger-4df6c1b6.png");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  /*background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(70,70,79,1) 50%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%);*/
}

h4 {
  color: white;
}

.Align1{
  margin: 0;
  position: absolute;
  top: 50%;
  left: 30%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.Align2{
  margin: 0;
  position: absolute;
  top: 50%;
  left: 60%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.Button {
  background-color: #25d7a7; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.Up {
  top:45%;
}
  </style>
  
  <form method="get" action="https://discord.gg/Ca6XpTRQaR">
    <h4 class="Align1 Up">Support Server</h4>
    <button class="Button Align1" type="submit">Support Server</button>
  </form>
  <form method="get" action="https://discord.com/oauth2/authorize?client_id=839835292785704980&scope=bot&permissions=402975831">
    <h4 class="Align2 Up">Invite The Bot</h4>
    <button class="Button Align2" type="submit">Invite Bot</button>
  </form>
  <p>Terrible Website By: Knei</p>`)
})

function keepAlive() {
  server.listen(3000, () => { console.log(chalk.greenBright("Server is Ready!!" + Date.now())) });
}

module.exports = keepAlive;