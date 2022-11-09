const getRandomInt = require('../helpers/getRandomInt')
const {wordOptions} = require("../options")


async function getAnotherWord(client){
    const db = client.db("telegramBot")
    const arr = await db.collection("words").find().toArray()
    let int = getRandomInt(arr.length)
    const word = arr[int].englishName
    return word
}

async function sendPropmt(chatId, word, bot){
    return await bot.sendMessage(chatId, `Переведите это слово ${word}`,   {
        reply_markup: {
            force_reply: true,
        },
    });
}

async function replyMessage(client, msg, word, bot){
    const chatId = msg.chat.id
    const db = client.db("telegramBot")
    const w = await db.collection("words").findOne({ englishName: `${word}` })
    const russiaNameFromPerson = msg.text.toLowerCase()
    const russiaNameFromDb = w.russiaName.toLowerCase()


    if (russiaNameFromPerson === russiaNameFromDb) {
        const anotherWord = await getAnotherWord(client)
        await bot.sendMessage(chatId, 'Вы ответили верно')
        const namePrompt = await sendPropmt(chatId, anotherWord, bot)
        bot.onReplyToMessage(chatId, namePrompt.message_id, (msg)=> replyMessage(client, msg, anotherWord, bot));
    } else {
        await bot.sendMessage(chatId, 'Вы ответили не верно')
        const namePrompt = await sendPropmt(chatId, word, bot)
        bot.onReplyToMessage(chatId, namePrompt.message_id, (msg)=> replyMessage(client, msg, word, bot));
    }
}


async function getAll(chatId, client, bot) {
    client.connect(async () => {
        try {
            const db = client.db("telegramBot")
            const arr = await db.collection("words").find().toArray()
            let int = getRandomInt(arr.length)
            const word = arr[int].englishName
            const namePrompt = await sendPropmt(chatId, word, bot)
            bot.onReplyToMessage(chatId, namePrompt.message_id, (msg)=> replyMessage(client, msg, word, bot));
        } finally {

        }
    })
}


module.exports = getAll