const replyButtons = require('./replyButtons')
const sendPrompt = require('./sendPrompt')
const getAnotherWord = require('./getAnotherWord')



async function messagePrompt(chatId, word, bot, text){
    await bot.sendMessage(chatId, text)
    return  await sendPrompt(chatId, word, bot)
}

async function replyMessage(client, msg, word, bot){
    const chatId = msg.chat.id;
    const db = client.db("telegramBot")
    const w = await db.collection("words").findOne({ englishName: `${word}` })
    const russiaNameFromDb = w.russiaName.toLowerCase()
    const russiaNameFromPerson = msg.text.toLowerCase()

    if (russiaNameFromPerson === russiaNameFromDb) {
        const anotherWord = await getAnotherWord(client)
        const namePrompt = await messagePrompt(chatId, anotherWord, bot, "Вы ответили верно")
        bot.onReplyToMessage(chatId, namePrompt.message_id, (msg)=> replyMessage(client, msg, anotherWord, bot));
    } else {
        const namePrompt = await messagePrompt(chatId, word, bot, "Вы ответили не верно")
        replyButtons(chatId, bot)
        bot.onReplyToMessage(chatId, namePrompt.message_id, (msg)=> replyMessage(client, msg, word, bot));

        bot.on('callback_query', async function onCallbackQuery(callbackQuery) {
            const action = callbackQuery.data;
            const msg = callbackQuery.message;
            let translateWord;
            const opts = {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                text: 'null'
            };
            if(action === 'translate'){
                translateWord = `${word} - ${russiaNameFromDb}`
                bot.editMessageText(translateWord,  opts);
            }
        })
    }
}




async function startLearn(chatId , client, bot) {
    client.connect(async () => {
        try {
            const word = await getAnotherWord(client)
            const namePrompt = await sendPrompt(chatId, word, bot)
            bot.onReplyToMessage(chatId, namePrompt.message_id, (msg)=> replyMessage(client, msg, word, bot));

            bot.on('callback_query', async function onCallbackQuery(callbackQuery) {
                const action = callbackQuery.data;
                const msg = callbackQuery.message;
                const chatId = msg.chat.id
                const word = await getAnotherWord(client)
                if (action === 'skip') {
                    const namePrompt = await sendPrompt(chatId, word, bot)
                    bot.onReplyToMessage(chatId, namePrompt.message_id, async (msg)=>  await replyMessage(client, msg, word, bot));
                }
            })
        } finally {

        }
    })
}

module.exports = startLearn


