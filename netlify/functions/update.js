exports.handler = async (event) => {
    console.log("Received an update from Telegram!", event.body);
    return { statusCode: 200 };
};


curl -F "url=https://telegrambot-78e117.netlify.app/.netlify/functions/update" https://api.telegram.org/5705020002:AAE7yT6Yp7of06gcVJawHcURphGX69MdLQk/setWebhook



