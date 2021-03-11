// Importing module
module.exports = {
  name: 'codex main',
  description: "lists the codex commands!",
  execute(Discord, client, fs, message, args) {

    // Reading file system
    const lyricsFiles = fs.readdirSync(`./lyrics/`).filter(file => file.endsWith('.txt'));

    // Embeding the response
    const embedCodex = new Discord.MessageEmbed();
    embedCodex.setColor('#FF6600')
      .setAuthor('Codex Bruxellensis', 'https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
      .setThumbnail('https://i.imgur.com/NNZm9nx.png')
      .setTitle('Codex Homescreen')

    // Functions
    // A switch looks cleaner than if and else if.
    switch (args[0]) {
      case 'index':
        client.commands.get('codex index').execute(Discord, fs, message, lyricsFiles);
        break;
      case 'lyrics':
        args = args.slice(1);//Original array = [lyrics, lied, van, geen, taal]
        //New array after slice(2) = [lied, van, geen, taal]
        client.commands.get('codex lyrics').execute(Discord, fs, message, args, lyricsFiles);
        break;
      default: //This means no other commands were given to -vub codex
        embedCodex.fields = [];
        embedCodex.addFields({ name: '-vub codex index', value: 'Find a list of songs that have been fed into this bot' })
        embedCodex.addFields({ name: '-vub codex lyrics [search words]', value: 'Find the lyrics of the desired song by entering tag words.' })
        embedCodex.addFields({ name: '-vub codex help', value: 'To get an overiew of all the commands of the bot.' })
        message.channel.send(embedCodex);
    }
  }
}