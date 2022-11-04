const run = require('./runBot')

async function addWord(chatId, bot){
    const namePrompt = await bot.sendMessage(chatId, "Введите слово через тире. Пример: word-слово", {
        reply_markup: {
            force_reply: true,
        },
    });
    bot.onReplyToMessage(chatId, namePrompt.message_id, async (nameMsg) => {
        const name = nameMsg.text.split("-")
        const doc = {englishName: name[0], russiaName: name[1]}
        run(doc).catch(console.dir);
        await bot.sendMessage(chatId, `Слово добавлено`);
    });
}


module.exports = addWord