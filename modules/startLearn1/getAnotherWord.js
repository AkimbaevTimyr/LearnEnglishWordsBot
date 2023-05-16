const getRandomInt = require('../../helpers/getRandomInt')
const {connectToDatabase} = require('../../helpers/connectToDataBase')

async function getAnotherWord(){
    const db = await connectToDatabase();
    const arr = await db.collection("words").find().toArray()
    let int = getRandomInt(arr.length)
    const word = arr[int].englishName
    return word
}


module.exports = getAnotherWord