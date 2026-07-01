const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stop the music and clear the queue"),

    async execute(interaction) {

        const queue = interaction.client.player.nodes.get(interaction.guild);

        if (!queue || !queue.currentTrack) {

            return interaction.reply({
                content: "❌ No music is playing.",
                ephemeral: true
            });

        }

        try {

            queue.delete();

            return interaction.reply({
                content: "⏹️ Music Stopped & Queue Cleared."
            });

        } catch (err) {

            console.error(err);

            return interaction.reply({
                content: "❌ Failed to stop the music.",
                ephemeral: true
            });

        }

    }

};