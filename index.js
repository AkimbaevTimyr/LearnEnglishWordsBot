require("dotenv").config()
const TelegramApi = require("node-telegram-bot-api")
const bot = new TelegramApi(process.env.TOKEN, {polling: true})

const startLearn = require("./modules/startLearn1/startLearn")
const addWord = require("./modules/addWord")
const getCount = require("./modules/getCount")

const {MongoClient} = require("mongodb")
const client = new MongoClient(process.env.URL);

const start = async () =>{
  bot.setMyCommands([
    {command: '/add', description: 'Добавление слово'},
    {command: '/learn', description: 'Учить слова'},
    {command: '/count', description: 'Количество слов в словаре'},
  ])
  bot.onText(/\/add/, async msg => addWord(msg.chat.id, bot))
  bot.onText(/\/learn/, async msg => startLearn(msg.chat.id, client, bot))
  bot.onText(/\/count/, async msg => getCount(msg.chat.id, client, bot))

}

start()




