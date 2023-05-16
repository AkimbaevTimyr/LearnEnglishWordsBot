// telegram.js
const TelegramApi = require('node-telegram-bot-api');

const bot = new TelegramApi(process.env.TOKEN, { polling: true });

module.exports = bot;
