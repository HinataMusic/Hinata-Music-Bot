const { EmbedBuilder } = require("discord.js");
const progressBar = require("./progressBar");

module.exports = (track, requester) => {

    return new EmbedBuilder()
        .setColor("#8A2BE2")
        .setAuthor({
            name: "🎵 Hinata Music",
            iconURL: "https://cdn.discordapp.com/emojis/🎵.png"
        })
        .setTitle(track.title)
        .setURL(track.url)
        .setThumbnail(track.thumbnail)
        .setDescription([
            `👤 **Artist:** ${track.author}`,
            `⏱️ **Duration:** ${track.duration}`,
            `🎧 **Requested By:** ${requester}`,
            ``,
            `${progressBar(0, 100)}`,
            `**00:00 / ${track.duration}**`
        ].join("\n"))
        .setFooter({
            text: "Hinata Music • Premium Music Experience"
        })
        .setTimestamp();

};