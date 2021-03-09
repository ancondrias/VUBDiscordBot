// Embed

const Discord = require('discord.js');
const embedCommands = new Discord.MessageEmbed();

embedCommands.setColor('#FF6600')
.setAuthor('VUB Digital Campus', 'https://i.imgur.com/hRIWwz0.png', 'https://vub.be/')
.setThumbnail('https://i.imgur.com/hRIWwz0.png')
.setTitle('Commands of Foxxy Bot')
//.setDescription('__To look up the lyrics use: __*-vub codex lyrics [songname]*');

//Module



const  fs = require('fs');

const commandsList = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));

module.exports = {
    name: 'help',
    description: "lists the commands!",
    execute(message){
      embedCommands.fields = [];

      for(const file of commandsList){

        embedCommands.addField(file.toString().replace(/.js/g, ""), "-vub " + file.toString().replace(/.js/g, ""), true)
      }
      message.channel.send(embedCommands);
      }

}