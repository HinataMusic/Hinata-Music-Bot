const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Change the music volume")
        .addIntegerOption(option =>
            option
                .setName("percent")
                .setDescription("Volume (1 - 100)")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        ),

    async execute(interaction) {

        const queue = interaction.client.player.nodes.get(interaction.guild);

        if (!queue || !queue.currentTrack) {

            return interaction.reply({
                content: "❌ No music is playing.",
                ephemeral: true
            });

        }

        const volume = interaction.options.getInteger("percent");

        try {

            queue.node.setVolume(volume);

            return interaction.reply({
                content: `🔊 Volume set to **${volume}%**`
            });

        } catch (err) {

            console.error(err);

            return interaction.reply({
                content: "❌ Failed to change volume.",
                ephemeral: true
            });

        }

    }

};