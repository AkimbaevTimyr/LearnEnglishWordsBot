const bot = require('../../helpers/telegram')

async function replyButtons(chatId){
    const opts = {
        reply_markup: {
        inline_keyboard: [
            [
            {
                text: 'Пропустить слово',
                callback_data: 'skip'
            },
            {
                text: 'Перевести слово',
                callback_data: 'translate'
            },
            ]
        ]
        }
    };
    bot.sendMessage(chatId, 'Вы можете пропустить или перевести слово', opts)
}


module.exports = replyButtons