// Embed

const Discord = require('discord.js');
const embedDice = new Discord.MessageEmbed();

embedDice.setColor('#FF6600')
.setAuthor(`Luigi's Cafe`, 'https://i.imgur.com/gmi8bjH.jpg', 'https://www.bruzz.be/luigis-cafe-2012-02-03')
.setThumbnail('https://i.imgur.com/gmi8bjH.jpg')
//.setTitle('Codex Lyrics');
//.setDescription('__To look up the lyrics use: __*-vub codex lyrics [songname]*');

// Functions

const dicelog = [];
console.log(dicelog);

const guesses = ["higher", "hoger", "lower", "lager"];

// module

module.exports = {
  name: 'dice',
  description: "this is a dice command!",
  execute(message, args){

//rolling dice

    var die1 = Math.floor(Math.random() * 6) + 1;
    var die2 = Math.floor(Math.random() * 6) + 1;

    var dice = die1 + die2;

    embedDice.addFields({name: `You rolled:`, value: `**#${dice}** [${die1}|${die2}]`});

//checking
    console.log("vvvvvvvvvvvvvvvv")
    console.log("Dice rolled previous round:");
    console.log(dicelog[0]);

    console.log("Dice rolled:");
    console.log("Die one: " + die1 + "\nDie Two: " + die2);
    console.log(dice)
  
    console.log("Arguments:");
    console.log(args[0]);

//conditions

    if (dicelog[0] === undefined || args[0] === undefined) {
      embedDice.setFooter('Note: Try adding higher/lower');
    };

    if (typeof dicelog[0] !== 'undefined' && guesses.includes(args[0])) {
      if ((dice > dicelog[0] && (args[0] === guesses[0] || args[0] === guesses[1])) || (dice < dicelog[0] && (args[0] === guesses[2] || args[0] === guesses[3]))) {
        embedDice.addFields({name: `*CORRECT GUESS*`, value: "You got lucky!"});        
      }
      else if ( dice === dicelog[0]) {
        embedDice.addFields({name: `YOU THREW THE SAME!`, value: "The person before you has to finish their glass!"});
      }
      else {
        embedDice.addFields({name: `*WRONG GUESS*`, value: "Drink a sip from your drink"});
      }
    dicelog.shift();
    }

    dicelog.push(dice);
    console.log("New old dice:");
    console.log(dicelog[0]);

    message.channel.send(embedDice);
    embedDice.fields = [];
    embedDice.footer = [];
  }
}

return