const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const request = require('request');

const bot = new Discord.Client();

bot.on("ready", async () => {
    console.log(`Bot is ready! ${bot.user.username}`);
});

bot.on('message', message => {
    if(message.author.bot || !message.content.startsWith(botSettings.prefix)) return;
    let args = message.content.slice(botSettings.prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    let url = `http://www.expandurl.com/api/v1/?url=${args[0]}`
    if(message.content.startsWith(botSettings.prefix + 'link')){
        request(url, function(err, response, body){
            if(err){
                message.channel.send('error',err);
            } else{
                message.channel.send(`Yoor URL is: `+body);
            }
        });
    };
});

bot.login(process.env.botSettings.token);
