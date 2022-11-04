require("dotenv").config()
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


