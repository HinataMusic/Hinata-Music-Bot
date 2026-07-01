const { Events } = require("discord.js");

module.exports = (client) => {

    client.on(Events.InteractionCreate, async (interaction) => {

        if (!interaction.isButton()) return;

        const queue = client.player.nodes.get(interaction.guild);

        if (!queue) {
            return interaction.reply({
                content: "❌ No music is playing.",
                ephemeral: true
            });
        }

        try {

            switch (interaction.customId) {

                case "pause":

                    if (!queue.node.isPaused()) {
                        queue.node.pause();
                    }

                    return interaction.reply({
                        content: "⏸️ Music Paused",
                        ephemeral: true
                    });

                case "resume":

                    if (queue.node.isPaused()) {
                        queue.node.resume();
                    }

                    return interaction.reply({
                        content: "▶️ Music Resumed",
                        ephemeral: true
                    });

                case "skip":

                    queue.node.skip();

                    return interaction.reply({
                        content: "⏭️ Song Skipped",
                        ephemeral: true
                    });

                case "stop":

                    queue.delete();

                    return interaction.reply({
                        content: "⏹️ Music Stopped",
                        ephemeral: true
                    });

            }

        } catch (err) {

            console.error(err);

            return interaction.reply({
                content: "❌ Something went wrong.",
                ephemeral: true
            });

        }

    });

};