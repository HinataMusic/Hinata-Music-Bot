const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pause the current song"),

    async execute(interaction) {

        const queue = interaction.client.player.nodes.get(interaction.guild);

        if (!queue || !queue.currentTrack) {

            return interaction.reply({
                content: "❌ No music is playing.",
                ephemeral: true
            });

        }

        if (queue.node.isPaused()) {

            return interaction.reply({
                content: "⚠️ Music is already paused.",
                ephemeral: true
            });

        }

        queue.node.pause();

        return interaction.reply({
            content: "⏸️ Music Paused."
        });

    }

};