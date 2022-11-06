
async function getCount(chatId, client, bot){
    client.connect(async () => {
        try{
            const db = client.db("telegramBot")
            const count = await db.collection("words").estimatedDocumentCount()
            await bot.sendMessage(chatId, `В словаре ${count} слов`)
        }finally {

        }
    })   
}

module.exports = getCount