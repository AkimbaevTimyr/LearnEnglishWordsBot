const getRandomInt = require('../../helpers/getRandomInt')

async function getAnotherWord(client){
    const db = client.db("telegramBot")
    const arr = await db.collection("words").find().toArray()
    let int = getRandomInt(arr.length)
    const word = arr[int].englishName
    return word
}


module.exports = getAnotherWord