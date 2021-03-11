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


// Once VUB Bot is ready, it sets activity and logs in console that it is ready.
client.once('ready', () => {
  console.log('Foxxy Bot is online!');

  client.user.setActivity('Cantusseeeen', {
    type: 'PLAYING'
    //      type: 'STREAMING', url:"https://www.twitch.tv/stvebsg"
  })

});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  //console.log("StartLOG: check")

  //trim() cuts off leading and trailing whitespaces
  const args = message.content.toLowerCase().replace(prefix, "").trim().split(' ');
  const command = args[0];//don't shift, you might need it and I adapted the code to work without shifts
  const extra = args.length - 1; //args contains the parent command and extra (like codex index). extra is the amount of extra commands
  //  console.log(command);
  //    console.log(args);

  //switch command looks cleaner and a tad bit faster
  switch (command) {
    case 'help':
      client.commands.get('help').execute(message);
      break;
    case 'home':
      client.commands.get('help').execute(message);
      break;
    case 'invite':
      client.commands.get('invite').execute(message);
      break;
    case 'embed':
      client.othercommands.get('embed').execute(message);
      break;
    case 'codex':
      //codex command is a parent command, it requires more commands to know what to do
      //this makes it so that the bot has a hierarchical structure with dice commands, codex commands and others
      let commands = client.commands.get('codex main');
      if (extra == 0) {
        commands.execute(Discord, client, fs, message, ['showEmbed']);
        //showEmbed will show the embed with the available commands, this can be anything but for readability
        //I named it this way
      }
      else commands.execute(Discord, client, fs, message, args);
      break;
    case 'lyrics': //user now has to address the correct parent command
    case 'index': //same as above
      client.commands.get('codex main').execute(Discord, client, fs, message, ['showEmbed']);
      break;
    case 'dice':
      //dice now needs an extra command (-vub dice [option] where option is required!)
      //this is conform with the hierarchical interface where commands are defined by their parent command
      //empty parent (-vub help) for example has parent 'root' so to speak
      let commands = client.commands.get('dice');
      if (extra == 0) {
        message.channel.send("Woops, I don't know what dice command you want. Maybe try *-vub dice throw*");
      }
      commands.execute(message, args);
      break;
    case 'throw':
      message.channel.send("Did you mean *-vub dice throw*?");
      break;
    case 'higher':
      message.channel.send("Did you mean *-vub dice higher*?");
      break;
    case 'lower':
      message.channel.send("Did you mean *-vub dice lower*?");
      break;
    case 'twitch':
      client.commands.get('twitch').execute(message);
      break;
    case 'play'://example of fall through. play, skip and stop will all send 'not yet implemented'
    case 'skip':
    case 'stop':
      message.channel.send("Not yet implemented, maybe if you ask the devs nicely they will speed up the process");
      break;
    default:
      message.channel.send("Command not found, please consult *-vub help*");
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