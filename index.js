require("dotenv").config()
const axios = require("axios")
const TelegramApi = require("node-telegram-bot-api")
const bot = new TelegramApi(process.env.TOKEN, {polling: true})
const getAll = require("./modules/getAll")
const addWord = require("./modules/addWord")

const {MongoClient} = require("mongodb")
const client = new MongoClient(process.env.URL);

const start = async () =>{
  bot.setMyCommands([
    {command: '/add', description: 'Добавление слово'},
    {command: '/learn', description: 'Учить слова'},
  ])
  bot.onText(/\/add/, async msg => addWord(msg.chat.id, bot))
  bot.onText(/\learn/, async msg => getAll(msg.chat.id, client, bot))
}

start()




await axios.post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`, {
  chat_id: JSON.parse(event.body).message.chat.id,
  text: "I got your message!",
});
