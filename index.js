  // "homepage": "https://github.com/AkimbaevTimyr/LearnEnglishWordsBot#readme"

const token = '5705020002:AAE7yT6Yp7of06gcVJawHcURphGX69MdLQk'
const TelegramApi = require("node-telegram-bot-api")
const bot = new TelegramApi(token, {polling: true})


const {MongoClient} = require("mongodb")
const url = "mongodb+srv://test:198305@cluster0.9re3pdi.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);


async function run(doc){
  client.connect( () => {
    try{
      const db = client.db("telegramBot")
      const collection = db.collection("words")
      const result = collection.insertOne(doc);
      console.log(result)
    }finally {
      setTimeout(() => {client.close()}, 1500)
    }
  })
}

function getRandomInt(max){
  return Math.floor(Math.random() * max);
}

const start = async () =>{
  
  bot.setMyCommands([
    {command: '/add', description: 'Добавление слово'},
    {command: '/learn', description: 'Учить слова'},
  ])

  bot.onText(/\/add/, async msg => {
    const chatId = msg.chat.id
    const namePrompt = await bot.sendMessage(msg.chat.id, "Введите слово через тире. Пример: word-слово", {
        reply_markup: {
            force_reply: true,
        },
    });
    bot.onReplyToMessage(msg.chat.id, namePrompt.message_id, async (nameMsg) => {
        const name = nameMsg.text.split("-")
        const doc = {englishName: name[0], russiaName: name[1]}
        run(doc).catch(console.dir);
        await bot.sendMessage(chatId, `Слово добавлено`);
    });
  });
  
  bot.onText(/\learn/, async msg => {
    const chatId = msg.chat.id
    async function getAll(){
      client.connect( async() => {
        try{
          const db = client.db("telegramBot")
          const arr = await db.collection("words").find().toArray()
          let int = getRandomInt(arr.length)
          var word = arr[int].englishName
          const namePrompt = await bot.sendMessage(msg.chat.id, `Переведите это слово ${word}`, {
              reply_markup: {
                  force_reply: true,
              },
          });
          bot.onReplyToMessage(msg.chat.id, namePrompt.message_id, async (msg) => {
              const db = client.db("telegramBot")
              const w = await db.collection("words").findOne({englishName: `${word}`})
              const russiaNameFromPerson = msg.text.toLowerCase()
              const russiaNameFromDb = w.russiaName.toLowerCase()
              if(russiaNameFromPerson  === russiaNameFromDb){
                await bot.sendMessage(chatId, 'Вы ответили верно')
              }else{
                await bot.sendMessage(chatId, 'Вы ответили не верно')
              }
          });
        }finally {

        }
      })
    }
    getAll()
  })

}

start()


