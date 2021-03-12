// Importing Discord modules
const Discord = require('discord.js');


// Defining the client of the VUB Discord Bot
const client = new Discord.Client();


// Defining the prefix of the VUB Discord Bot
const prefix = '-';


// Defining file system
const fs = require('fs');

//returning commands of the VUB Discord Bot
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
};

//returning 'codex' commands of the VUB Discord Bot
const codexcommandsFolder = fs.readdirSync(`./commands/codexcommands`).filter(codexcommandsFile => codexcommandsFile.endsWith('.js'));
for (const file of codexcommandsFolder) {
  const codexcommand = require(`./commands/codexcommands/${file}`);
  client.commands.set(codexcommand.name, codexcommand);
};

//returning 'other' commands of the VUB Discord Bot
const othercommandFolder = fs.readdirSync(`./commands/othercommands`).filter(file => file.endsWith('.js'));
for (const file of othercommandFolder) {
  const othercommand = require(`./commands/othercommands/${file}`);
  client.commands.set(othercommand.name, othercommand);
};

client.commands.sort();
client.commands.sort();


// Once VUB Bot is ready, it sets activity and logs in console that it is ready.
client.once('ready', () => {
  console.log('Foxxy Bot is online!');

  client.user.setActivity('Cantusseeeen', {
    type: 'PLAYING'
    //      type: 'STREAMING', url:"https://www.twitch.tv/stvebsg"
  })

});

client.on('message', message => {
  //Checks if the message starts with prefix and isn't written by the bot.
  if (!message.content.startsWith(prefix) || message.author.bot) return;


  //trim() cuts off leading and trailing whitespaces
  const args = message.content.toLowerCase().replace(prefix, "").trim().split(' ');
  const command = args[0];

  switch (command) {
    case 'help':
      client.commands.get('home').execute(Discord, prefix, message);
      break;
    case 'home':
      client.commands.get('home').execute(Discord, prefix, message);
      break;
    case 'all':
      client.commands.get('all').execute(Discord, client, fs, prefix, message);
      break;
    case 'invite':
      client.commands.get('invite').execute(message);
      break;
    case 'embed':
      client.commands.get('embed').execute(Discord, message);
      break;
    case 'twitch':
      client.commands.get('twitch').execute(message);
      break;
  
    //codex commands
    case 'codex':
      args.shift();
      client.commands.get('codex').execute(Discord, client, fs, prefix, message, args);
      break;
    case 'lyrics':
      client.commands.get('codex').execute(Discord, client, fs, prefix, message, args);
      break;
    case 'random':
      client.commands.get('codex').execute(Discord, client, fs, prefix, message, args);
      break;
    case 'index':
      client.commands.get('codex').execute(Discord, client, fs, prefix, message, args);
      break;


    //dice commands
    case 'dice':
      args.shift();
      client.commands.get('dice').execute(Discord, message, args);
      break;
    case 'throw':
      client.commands.get('dice').execute(Discord, message, args);
      break;
    case 'higher':
      client.commands.get('dice').execute(Discord, message, args);
      break;
    case 'lower':
      client.commands.get('dice').execute(Discord, message, args);
      break;
    case 'hoger':
      client.commands.get('dice').execute(Discord, message, args);
      break;
    case 'lager':
      client.commands.get('dice').execute(Discord, message, args);
      break;


    //music commands

    case 'play'://example of fall through. play, skip and stop will all send 'not yet implemented'
    case 'skip':
    case 'stop':
      message.channel.send("Not yet implemented, maybe if you ask the devs nicely they will speed up the process");
      break;

    default:
      client.commands.get('home').execute(Discord, prefix, message);
      break;
  };

  /*else if (command === `play` || command === `skip` || command === `stop`) {
    client.commands.get('music').execute(message, command, args);
  }

  else {
    message.channel.send("Command not found, please consult *-vub help*");
  };*/

  //console.log("ENDLOG: check")

})

client.login(process.env.DISCORD_TOKEN);