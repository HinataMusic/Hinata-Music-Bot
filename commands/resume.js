const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resume the paused music"),

    async execute(interaction) {

        const queue = interaction.client.player.nodes.get(interaction.guild);

        if (!queue || !queue.currentTrack) {

            return interaction.reply({
                content: "❌ No music is playing.",
                ephemeral: true
            });

        }

        if (!queue.node.isPaused()) {

            return interaction.reply({
                content: "⚠️ Music is already playing.",
                ephemeral: true
            });

        }

        queue.node.resume();

        return interaction.reply({
            content: "▶️ Music Resumed."
        });

    }

};