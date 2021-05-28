const MongoClient = require('mongodb').MongoClient;
const uri = require('./config.json');
const bot = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
bot.connect(err => {
  const collection = bot.db("discord").collection("welcomeID");
  const testID = {}
  bot.close();
});