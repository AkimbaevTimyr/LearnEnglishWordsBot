const getRandomInt = require('../helpers/getRandomInt')
async function getAll(chatId, client, bot) {
    client.connect(async () => {
        try {
            const db = client.db("telegramBot")
            const arr = await db.collection("words").find().toArray()
            let int = getRandomInt(arr.length)
            const word = arr[int].englishName
            const namePrompt = await bot.sendMessage(chatId, `Переведите это слово ${word}`, {
                reply_markup: {
                    force_reply: true,
                },
            });
            bot.onReplyToMessage(chatId, namePrompt.message_id, async (msg) => {
                const db = client.db("telegramBot")
                const w = await db.collection("words").findOne({ englishName: `${word}` })
                const russiaNameFromPerson = msg.text.toLowerCase()
                const russiaNameFromDb = w.russiaName.toLowerCase()
                if (russiaNameFromPerson === russiaNameFromDb) {
                    await bot.sendMessage(chatId, 'Вы ответили верно')
                } else {
                    await bot.sendMessage(chatId, 'Вы ответили не верно')
                }
            });
        } finally {

        }
    })
}

module.exports = getAll