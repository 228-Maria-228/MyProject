const TelegramBot = require('node-telegram-bot-api');
const token = '6363233896:AAEfkUCTfcwehmllfYRuC0wuSxZoqmTFZjs';
const bot = new TelegramBot(token, { polling: true });

const menuMessageText = `<b>Главное меню Tra-Well</b> \n\nВыбери, что тебе нужно:`;
const menuOptinos = {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'Смотреть посты 👀', callback_data: 'nextBTN' }],
        ],
    },
    parse_mode: 'HTML',
};
let cards = []
let count = 0
function getPost(msg) {
    fetch('http://localhost:3001/cards-get', {
        method: 'GET',
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            cards = res.data;
            count = 0;
            bot.sendMessage(msg.chat.id, menuMessageText, menuOptinos);
        })
        .catch((err) => {
            console.log(err)
        })
}

bot.onText(/\/start/, (msg) => {
    getPost(msg)
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    if (count == cards.length) {
        const text =  `<b>Посты закончились( \n\n <i>Если хотите посмотреть закново -> /start</i></b>`
        bot.sendMessage(chatId, text, {
            parse_mode: 'HTML',
        });
        return;
    } else {
        const text = `Название: <b>${cards[count].name}</b> \nОценка: ${cards[count].mark}/5 \n\n Описание: <i>${cards[count].description}</i>'`;
        switch (data) {
            case 'nextBTN':
                bot.sendPhoto(chatId, cards[count].link, {
                    caption: text,
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Следущий пост 😎', callback_data: 'nextBTN' }],
                        ],
                    },
                }).then(() => {
                    count++
                })
                break
        }
    }
});
