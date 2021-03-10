// Importing Discord modules
const Discord = require('discord.js');

// Defining the client of the VUB Discord Bot
const client = new Discord.Client();

// Defining the prefix of the VUB Discord Bot
const prefix = '-vub ';

// Defining file system

const fs = require('fs');
path = require('path');

//returning commands of the VUB Discord Bot

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
};


//returning 'codex' commands of the VUB Discord Bot
const codexcommandsFolder = fs.readdirSync(`./commands/codexcommands`).filter(codexcommandsFile => codexcommandsFile.endsWith('.js'));
for(const file of codexcommandsFolder){
    const codexcommand = require(`./commands/codexcommands/${file}`);

    client.commands.set(codexcommand.name, codexcommand);
};


//returning 'other' commands of the VUB Discord Bot
const othercommandFolder = fs.readdirSync(`./commands/othercommands`).filter(file => file.endsWith('.js'));
for(const file of othercommandFolder){
    const othercommand = require(`./commands/othercommands/${file}`);

    client.commands.set(othercommand.name, othercommand);
};


// Once VUB Bot is ready, it sets activity and logs in console that it is ready.
client.once('ready', () => {
    console.log('Foxxy Bot is online!');

    client.user.setActivity('Cantusseeeen',{
        type: 'PLAYING'
//      type: 'STREAMING', url:"https://www.twitch.tv/stvebsg"
    })

});



// Functions
client.on('message', message =>{
  if(!message.content.startsWith(prefix) || message.author.bot) return;
//console.log("StartLOG: check")

  const args = message.content.toLowerCase().replace(prefix, "").split(' ');
  const command = args.shift();
//  console.log(command);
//    console.log(args);

  if (command === 'twitch') {
    client.commands.get('twitch').execute(message);
  }

  else if (command === 'help' || command === 'home' || command === 'home') {
    client.commands.get('help').execute(message);
  } 
    
  else if (command === 'invite') {
    client.commands.get('invite').execute(message);
  } 
    
  else if (command === 'embed') {
    client.commands.get('embed').execute(message);
  } 
    
  else if (command === 'codex'||command ==='lyrics'||command ==='index') {
    if (command !== 'codex') {
      args.unshift(command);
    };
    client.commands.get('codex main').execute(Discord, client, fs, message, args);
  }
    
  else if (command === 'dice'||command ==='higher'||command ==='lower') {
    if (command !== 'dice') {
      args.unshift(command);
    };
    client.commands.get('dice').execute(message, args);
    return
  }

  else if (command === `play` || command === `skip` || command === `stop`) {
    client.commands.get('music').execute(message, command, args);
  }
  
  else {
      message.channel.send("Command not found, please consult *-vub help*");
  };

//console.log("ENDLOG: check")

})  

client.login(process.env.DISCORD_TOKEN);
