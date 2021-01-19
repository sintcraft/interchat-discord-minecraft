/************** VARIABLES **************/
const mineflayer = require('mineflayer')
const Discord = require('discord.js')
const config = require('./config.json')
const client = new Discord.Client()
const Bot = mineflayer.createBot({
    host: config.SERVER,
    username: config.USER,
    version: false
})
/************** CODE INICIO **************/
client.on('ready', ()=>{
    console.log('Discord Conectado!')
})
Bot.on('login', () => {
    setTimeout(function(){Bot.chat(config.COMMAND_JOIN)}, 1000)
})
client.login(config.TOKEN)
/************** EVENTOS **************/
client.on('message', (msg) => {
    if(msg.author.id == client.user.id)return
    if(msg.channel.id != config.CHANNEL)return
    Bot.chat(msg.author.username+' >> '+msg.content)
})
Bot.on('chat', (user, msg) => {
    if(config.TYPE == 'MESSAGE'){
        client.channels.resolve(config.CHANNEL).send(user+' >> '+msg)
        //EJEMPLO discord >> sintcraft >> hola
    }else if(config.TYPE == 'SAY'){
        client.channels.resolve(config.CHANNEL).send('/say'+user+' >> '+msg)
        //EJEMPLO [Discord]sintcraft >> hola
    }
})