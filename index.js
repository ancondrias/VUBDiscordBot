const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '-vub ';

const fs = require('fs');


//

//returning commands

client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
};


//returnung other commands

path = require('path')

client.othercommands = new Discord.Collection();

//console.log(path.join(__dirname, `/commands/othercommands`))

const othercommandFiles = fs.readdirSync(path.join(__dirname, `/commands/othercommands`)).filter(file => file.endsWith('.js'));

for(const file of othercommandFiles){
    const othercommand = require(path.join(__dirname, `/commands/othercommands/${file}`));

    client.othercommands.set(othercommand.name, othercommand);
};



client.codexcommands = new Discord.Collection();

const codexcommandFiles = fs.readdirSync(path.join(__dirname, `commands/codexcommands`)).filter(file => file.endsWith('.js'));

for(const file of codexcommandFiles){
    const codexcommand = require(path.join(__dirname, `commands/codexcommands/${file}`));

    client.codexcommands.set(codexcommand.name, codexcommand);
};



client.once('ready', () => {
    console.log('Foxxy Bot is online!');

    client.user.setActivity('Cantusseeeen',{
        type: 'PLAYING'
//      type: 'STREAMING', url:"https://www.twitch.tv/stvebsg"
    })

});




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
    client.othercommands.get('embed').execute(message);
  } 
    
  else if (command === 'codex'||command ==='lyrics'||command ==='index') {
    if (command !== 'codex') {
      args.unshift(command);
    };
    client.commands.get('codex').execute(message, args);
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
