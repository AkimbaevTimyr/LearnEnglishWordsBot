const sendPrompt = require('./sendPrompt')

async function messagePrompt(chatId, word, bot, text){
    await bot.sendMessage(chatId, text)
    return  await sendPrompt(chatId, word, bot)
}

module.exports = messagePrompt