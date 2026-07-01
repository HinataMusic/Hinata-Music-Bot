const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Show the current music queue"),

    async execute(interaction) {

        const queue = interaction.client.player.nodes.get(interaction.guild);

        if (!queue || !queue.currentTrack) {

            return interaction.reply({
                content: "❌ No music is playing.",
                ephemeral: true
            });

        }

        const tracks = queue.tracks.toArray();

        if (!tracks.length) {

            return interaction.reply({
                content:
                    `🎵 **Now Playing:**\n` +
                    `**${queue.currentTrack.title}**\n\n` +
                    `📃 Queue is empty.`
            });

        }

        const list = tracks
            .slice(0, 10)
            .map((track, index) =>
                `**${index + 1}.** ${track.title}`
            )
            .join("\n");

        return interaction.reply({

            content:
                `🎵 **Now Playing**\n` +
                `**${queue.currentTrack.title}**\n\n` +
                `📃 **Queue (${tracks.length})**\n\n${list}`

        });

    }

};