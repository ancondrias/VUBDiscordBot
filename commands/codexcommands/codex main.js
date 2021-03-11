// Importing module
module.exports = {
    name: 'codex main',
    description: "lists the codex commands!",
    execute(Discord, client, fs, message, args){

// Reading file system
    const lyricsFiles = fs.readdirSync(`./lyrics/`).filter(file => file.endsWith('.txt'));

// Embeding the response
      const embedCodex = new Discord.MessageEmbed();
      embedCodex.setColor('#FF6600')
      .setAuthor('Codex Bruxellensis', 'https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
      .setThumbnail('https://i.imgur.com/NNZm9nx.png')
      .setTitle('Codex Commands')

// Functions
      if (args[0] == "index") {
        client.commands.get('codex index').execute(Discord, fs, message, lyricsFiles);
      }
      
      else if (args[0] == "lyrics") {
        args.shift();
        client.commands.get('codex lyrics').execute(Discord, fs, message, args, lyricsFiles);
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