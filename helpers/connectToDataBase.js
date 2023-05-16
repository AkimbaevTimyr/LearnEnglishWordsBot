const { MongoClient } = require('mongodb');

// глобальная переменная для хранения подключения к базе данных
let db;

async function connectToDatabase() {
    // если подключение к базе данных уже установлено, вернуть его
    if (db) {
        return db;
    }

    // подключение к базе данных
    const client = await MongoClient.connect(process.env.URL);
    db = client.db("telegramBot");

    return db;
}

module.exports = { connectToDatabase };
