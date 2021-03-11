// Importing module
module.exports = {
    name: 'codex index',
    description: "index of codex songs!",
    execute(Discord, fs, message, lyricsFiles){

// Embeding the response
      const embedCodexIndex = new Discord.MessageEmbed();
      embedCodexIndex.setColor('#FF6600')
      .setAuthor('Codex Bruxellensis', 'https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
      .setThumbnail('https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
      .setTitle('Index of songs')
      .setDescription('__To look up the lyrics use: __*-vub codex lyrics [songname]*');

// Functions
      for(const lyricsFile of lyricsFiles){
        embedCodexIndex.addField(lyricsFile.toString().replace(/.txt/g, ""),"\u200b" , true)
      };

      message.channel.send(embedCodexIndex);

    }
}





