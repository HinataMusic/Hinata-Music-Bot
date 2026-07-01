const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip the current song"),

    async execute(interaction) {

        const queue = interaction.client.player.nodes.get(interaction.guild);

        if (!queue || !queue.currentTrack) {

            return interaction.reply({
                content: "❌ No music is playing.",
                ephemeral: true
            });

        }

        try {

            queue.node.skip();

            return interaction.reply({
                content: "⏭️ Song Skipped."
            });

        } catch (err) {

            console.error(err);

            return interaction.reply({
                content: "❌ Failed to skip the song.",
                ephemeral: true
            });

        }

    }

};