const { connectToDatabase } = require('../helpers/connectToDataBase');
const bot = require('../helpers/telegram')
async function getCount(chatId){
    const db = await connectToDatabase();
    const count = await db.collection("words").estimatedDocumentCount()
    await bot.sendMessage(chatId, `В словаре ${count} слов`)
}

module.exports = getCount