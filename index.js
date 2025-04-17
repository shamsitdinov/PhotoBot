import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

const animalsOptions = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: 'Random Img', callback_data: 'random' },
                { text: 'Img by ID', callback_data: 'byid' }
            ]
        ]
    } 
}


bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
        await bot.sendMessage(chatId, "Bot ish boshladi", animalsOptions);
    }
});
bot.on('callback_query', async (msg) => {
    const data = msg.data
    const chatId = msg.message.chat.id;
    const randomNumber=Math.floor(Math.random()*100)
    if(data=='random'){ 
        fetch(process.env.IMG_ID_API).then(res => res.json()).then(data =>
            bot.sendPhoto(chatId, data[randomNumber].download_url,animalsOptions)
        )
            
    }
// console.log(data) 
})