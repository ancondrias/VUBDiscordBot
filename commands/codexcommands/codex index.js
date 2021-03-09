// Embed

const Discord = require('discord.js');
const embedCodex = new Discord.MessageEmbed();

embedCodex.setColor('#FF6600')
.setAuthor('Codex Bruxellensis', 'https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
.setThumbnail('https://i.imgur.com/NNZm9nx.png')
.setTitle('Index of songs')
.setDescription('__To look up the lyrics use: __*-vub codex lyrics [songname]*');

// Functions

const  fs = require('fs');
const lyricsIndex = fs.readdirSync(`./lyrics/`).filter(file => file.endsWith('.txt'));

for(const file of lyricsIndex){
  embedCodex.addField(file.toString().replace(/.txt/g, ""),"\u200b" , true)
};

// Module

module.exports = {
    name: 'codex index',
    description: "index of codex songs!",
    execute(message){

      message.channel.send(embedCodex);

    }
}





