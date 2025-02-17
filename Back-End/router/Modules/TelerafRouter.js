// 导入telegram bot 模块
const {Telegraf} = require('telegraf');
require('dotenv').config({ path: '../../.env' });

const { getMoonshotMessage } = require('../../model/Modules/Telebot');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// 启动Telegram Bot
// bot.start((ctx) => ctx.reply('欢迎使用SouthAki开发的Telegram Bot🎉🎉🎉'));
bot.start(async (ctx) => {
    // 发送欢迎信息
    await ctx.reply('欢迎使用SouthAki开发的Telegram Bot🎉🎉🎉');
});

// 定义Help
bot.help(async (ctx) => {
    ctx.reply('命令列表:\n/start - 开始\n/help - 帮助')
});

// 获取用户的信息
bot.command('info', async (ctx) => {
    const user = ctx.from;
    ctx.reply(`您的用户名是: ${user.username}\n您的ID是: ${user.id}`);
});

bot.command('exit', async (ctx) => {
    ctx.reply('再见👋');
});

// 捕获用户发送的文本信息
bot.on('text', async (ctx) => {
    const user = ctx.from;
    const userMessage = ctx.message.text; // 获取用户的信息
    const userId = ctx.from.id; // 获取用户的Id

    try {
        const response = await getMoonshotMessage(userMessage,user.username);
        console.log('response:', response);

        const reply = response ? response : '抱歉，我不知道如何回答这个问题😅';

        // 将接口的答复返回给用户
        await ctx.reply(reply);
    } catch (e) {
        console.log(e);
        await ctx.reply('抱歉，出错了哈😅');
    }
})

// 设置命令菜单
bot.telegram.setMyCommands([
    {
        command: 'start',
        description: '开始使用'
    },
    {
        command: 'info',
        description: '获取用户信息'
    },
    {
        command: 'help',
        description: '获取帮助'
    },
    {
        command: 'exit',
        description: '退出'
    }
]);

// 捕获用户未经上面处理过的消息
bot.on('message', async (ctx) => {
    ctx.reply('抱歉，我不知道如何回答这个问题😅');
});


module.exports = bot;