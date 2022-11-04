require('dotenv').config()
const url = process.env.URL
const {MongoClient} = require("mongodb")
const client = new MongoClient(url);

async function run(doc) {
    client.connect(() => {
        try {
            const db = client.db("telegramBot")
            const collection = db.collection("words")
            const result = collection.insertOne(doc);
        } finally {
            setTimeout(() => { client.close() }, 1500)
        }
    })
}

module.exports = run