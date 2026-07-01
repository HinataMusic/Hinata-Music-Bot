const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Play a YouTube or Spotify playlist")
        .addStringOption(option =>
            option
                .setName("url")
                .setDescription("Playlist URL")
                .setRequired(true)
        ),

    async execute(interaction) {

        const url = interaction.options.getString("url");
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({
                content: "❌ Please join a voice channel first.",
                ephemeral: true
            });
        }

        await interaction.deferReply();

        try {

            const result = await interaction.client.player.play(
                voiceChannel,
                url,
                {
                    nodeOptions: {
                        metadata: interaction
                    }
                }
            );

            return interaction.editReply({
                content: `📃 Playlist Loaded Successfully!\n🎵 **${result.track.title}**`
            });

        } catch (err) {

            console.error(err);

            return interaction.editReply({
                content: "❌ Playlist load failed."
            });

        }

    }

};