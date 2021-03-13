// The emoji to react for next page
const nextEmoji = '👉'

// The emoji for previous page
const previousEmoji = '👈'

// Importing module
module.exports = {

  name: 'codex index',
  description: "index of codex songs!",
  execute(Discord, fs, message, lyricsFiles) {

    //Generic embed creator function
    function createEmbedCodex() {
      const embedCodexIndex = new Discord.MessageEmbed();
      embedCodexIndex.setColor('#FF6600')
        .setAuthor('Codex Bruxellensis', 'https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
        .setThumbnail('https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
        .setTitle('Index of songs')
        .setDescription('__To look up the lyrics use: __*-vub codex lyrics [songname]*');
      return embedCodexIndex;
    }

    // Embeding the response
    let embedCodexIndex = createEmbedCodex();

    let embedLimit = 24;

    // Remember previous embeds when scrolling
    let cachedEmbeds = [];

    // Functions
    function switchPage(index, embedSent, collector) {
      // Returns a closure that knows the given index so it can be applied on collect
      function actualSwitch(reaction) {
        const previous = reaction.emoji.name === previousEmoji;
        if (previous) {
          if (cachedEmbeds.length != 0)
            embedCodexIndex = cachedEmbeds.pop();
          else
            return;
        }
        else {
          if (index != lyricsFiles.length) {
            // Add to front
            cachedEmbeds.push(embedCodexIndex);
          }
          else {
            index = 0;
            cachedEmbeds = [];
          }
          // Refresh the embed (clearing it)
          embedCodexIndex = createEmbedCodex();
          embedLimit = 24;

          for (index; index < lyricsFiles.length; index++) {
            if (embedLimit == 0 && index < lyricsFiles.length) {
              break;
            }
            else {
              embedCodexIndex.addField(lyricsFiles[index].toString().replace(/.txt/g, ""), "\u200b", true);
              embedLimit--;
            }
          }
        }
        embedSent.edit(embedCodexIndex);
      }
      return actualSwitch;
    }

    function removeCache(embedSent) {
      cachedEmbeds = []; // Removes the previous page for on timeout
      embedSent.reactions.removeAll(); // Remove reactions such that no one can interfere with them anymore
    }

    function createReactionListener(index, embedSent) {
      const filter = (reaction, _) => reaction.emoji.name === nextEmoji || reaction.emoji.name === previousEmoji;
      const collector = embedSent.createReactionCollector(filter, { time: 60000, dispose: true });
      collector.on('collect', switchPage(index, embedSent, collector));
      collector.on('end', _ => removeCache(embedSent));
    }

    function checkOverflow(overflow, embedSent) {
      console.log('checking overflow: ' + overflow);
      if (overflow > 0) {
        embedSent.react(previousEmoji)
          .then(() => embedSent.react(nextEmoji)
            .then(() => { createReactionListener(overflow, embedSent) }))
          .catch((err) => console.log('Emoji react failed: ' + err));
      }
    }

    for (let i = 0; i < lyricsFiles.length; i++) {
      if (embedLimit == 0 && i < lyricsFiles.length) {
        message.channel.send(embedCodexIndex).then((m) => { checkOverflow(i, m) });
        break;
      }
      else {
        console.log(lyricsFiles[i].toString());
        embedCodexIndex.addField(lyricsFiles[i].toString().replace(/.txt/g, ""), "\u200b", true);
        embedLimit--;
      }
    }
    cachedEmbeds = []; // If a new index is asked, clear cachedEmbeds
  }
}