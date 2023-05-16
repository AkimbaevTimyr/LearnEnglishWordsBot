require("dotenv").config()
const bot = require("./helpers/telegram")

const startLearn = require("./modules/startLearn1/startLearn")
const addWord = require("./modules/addWord")

const getCount = require("./modules/getCount")
const start = async () =>{
  bot.setMyCommands([
    {command: '/add', description: 'Добавление слово'},
    {command: '/learn', description: 'Учить слова'},
    {command: '/count', description: 'Количество слов в словаре'},
  ])
  bot.onText(/\/add/, async msg => addWord(msg.chat.id))
  bot.onText(/\/learn/, async msg => startLearn(msg.chat.id))
  bot.onText(/\/count/, async msg => getCount(msg.chat.id))
}

start()




