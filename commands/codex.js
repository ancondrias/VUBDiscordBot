// Embed

const Discord = require('discord.js');
const embedCodex = new Discord.MessageEmbed();

embedCodex.setColor('#FF6600')
.setAuthor('Codex Bruxellensis', 'https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
.setThumbnail('https://i.imgur.com/NNZm9nx.png')
.setTitle('Codex Homescreen')
//.setDescription('__To look up the lyrics use: __*-vub codex lyrics [songname]*');

//function


const client = new Discord.Client();

const fs = require('fs');

path = require('path')

client.codexcommands = new Discord.Collection();

const codexcommandFiles = fs.readdirSync(path.join(__dirname, `/codexcommands`)).filter(file => file.endsWith('.js'));

for(const file of codexcommandFiles){
    const codexcommand = require(path.join(__dirname, `/codexcommands/${file}`));

    client.codexcommands.set(codexcommand.name, codexcommand);
}

//Module

module.exports = {
    name: 'codex',
    description: "lists the codex commands!",
    execute(message, args){

      if (args[0] == "index") {
        client.codexcommands.get('codex index').execute(message);
      }
      
      else if (args[0] == "lyrics") {
        args.shift();
        client.codexcommands.get('codex lyrics').execute(message, args);
      }
      
      else {
          embedCodex.fields = [];
          embedCodex.addFields({ name: '-vub index', value: 'Find a list of songs that have been fed into this bot'})
          embedCodex.addFields({ name: '-vub lyrics [search words]', value: 'Find the lyrics of the desired song by entering tag words.'})
          embedCodex.addFields({ name: '-vub help', value: 'To get an overiew of all the commands of the bot.'})                    
          message.channel.send(embedCodex);
      }

    }
}