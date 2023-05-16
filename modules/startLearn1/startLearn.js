const replyButtons = require('./replyButtons')
const sendPrompt = require('./sendPrompt')
const getAnotherWord = require('./getAnotherWord')
const messagePrompt = require("./messagePrompt")
const { connectToDatabase } = require('../../helpers/connectToDataBase');
const bot = require('../../helpers/telegram')



async function replyMessage(msg, word){
    const chatId = msg.chat.id;
    const db = await connectToDatabase();
    const w = await db.collection("words").findOne({ englishName: `${word}` })
    const russiaNameFromDb = w.russiaName.toLowerCase()
    const russiaNameFromPerson = msg.text.toLowerCase()

    if (russiaNameFromPerson.trim() === russiaNameFromDb.trim()) {
        const anotherWord = await getAnotherWord()
        const namePrompt = await messagePrompt(chatId, anotherWord, "Вы ответили верно")
        bot.onReplyToMessage(chatId, namePrompt.message_id, (msg)=> replyMessage(msg, anotherWord));
    } else {
        const namePrompt = await messagePrompt(chatId, word, "Вы ответили не верно")
        replyButtons(chatId)
        bot.onReplyToMessage(chatId, namePrompt.message_id, (msg)=> replyMessage(msg, word));

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
                const www = JSON.parse(JSON.stringify(await db.collection("words").findOne({ englishName: `${word}` })));
                const odin = www.russiaName;
                const dva = www.englishName;
                translateWord = `${dva} - ${odin}`
                bot.editMessageText(translateWord,  opts);
            }
        })
    }
}

async function startLearn(chatId) {
    const word = await getAnotherWord()
    const namePrompt = await sendPrompt(chatId, word)
    bot.onReplyToMessage(chatId, namePrompt.message_id, (msg)=> replyMessage(msg, word));

    bot.on('callback_query', async function onCallbackQuery(callbackQuery) {
        const action = callbackQuery.data;
        const msg = callbackQuery.message;
        const chatId = msg.chat.id
        const word = await getAnotherWord()
        if (action === 'skip') {
            const namePrompt = await sendPrompt(chatId, word)
            bot.onReplyToMessage(chatId, namePrompt.message_id, async (msg)=>  await replyMessage(msg, word));
        }
    })
}

module.exports = startLearn


