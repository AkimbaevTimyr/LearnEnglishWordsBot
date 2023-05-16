const sendPrompt = require('./sendPrompt')
const bot = require('../../helpers/telegram')

async function messagePrompt(chatId, word, text){
    await bot.sendMessage(chatId, text)
    return await sendPrompt(chatId, word)
}

module.exports = messagePrompt