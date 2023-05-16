const run = require('./runBot')
const bot = require('../helpers/telegram')


async function sendPropmt(chatId){
    return await bot.sendMessage(chatId, "Введите слово через тире. Пример: word-слово", {
        reply_markup: {
            force_reply: true,
        },
    })
}

async function replyMessage(msg, chatId){
    const name = msg.text.split("-")
        if(name.length < 2){
            await bot.sendMessage(chatId, "Вы не правильно ввели слово")
            const namePrompt = await sendPropmt(chatId, bot)
            bot.onReplyToMessage(chatId, namePrompt.message_id, async (msg) => replyMessage(msg, chatId, bot));
        }else{
            const doc = {englishName: name[0], russiaName: name[1]}
            run(doc).catch(console.dir);
            await bot.sendMessage(chatId, `Слово добавлено`);
        }
        
}

async function addWord(chatId){
    const namePrompt = await sendPropmt(chatId, bot)
    bot.onReplyToMessage(chatId, namePrompt.message_id, async (msg) => replyMessage(msg, chatId, bot));
}


module.exports = addWord