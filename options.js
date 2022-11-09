module.exports = {
    wordOptions : {
       reply_markup: JSON.stringify({
           inline_keyboard: [
               [{text: 'Следующее слово', callback_data: '1'}],
           ]
       })
   },
} 
