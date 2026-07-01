const { SlashCommandBuilder } = require("discord.js");

const musicEmbed = require("../utils/musicEmbed");
const musicButtons = require("../utils/musicButtons");
const playerManager = require("../utils/playerManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a song from YouTube or Spotify")
        .addStringOption(option =>
            option
                .setName("song")
                .setDescription("Song name or URL")
                .setRequired(true)
        ),

    async execute(interaction) {

        console.log("PLAY COMMAND RECEIVED");

        const query = interaction.options.getString("song");
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({
                content: "❌ Please join a voice channel first.",
                ephemeral: true
            });
        }

        try {

            await interaction.deferReply();
            console.log("DEFER DONE");

            console.log("STARTING PLAYER...");

            const result = await interaction.client.player.play(
                voiceChannel,
                query,
                {
                    nodeOptions: {
                        metadata: interaction
                    }
                }
            );

            console.log("========== PLAY RESULT ==========");
            console.dir(result, { depth: null });
            console.log("================================");

            playerManager.set(interaction.guild.id, {
                channel: voiceChannel,
                track: result.track
            });

            return interaction.editReply({
                embeds: [
                    musicEmbed(
                        result.track,
                        interaction.user.tag
                    )
                ],
                components: [
                    musicButtons()
                ]
            });

        } catch (err) {

            console.log("========== REAL ERROR ==========");
            console.error(err);
            console.error(err.stack);
            console.log("================================");

            if (interaction.deferred || interaction.replied) {
                return interaction.editReply({
                    content: `❌ ${err.message}`
                });
            }

            return interaction.reply({
                content: `❌ ${err.message}`,
                ephemeral: true
            });

        }

    }

};