async function sendPrompt(chatId, word, bot){
    return await bot.sendMessage(chatId, `Переведите это слово ${word}`,   {
        reply_markup: {
            force_reply: true,
        },
    });
}


module.exports = sendPrompt