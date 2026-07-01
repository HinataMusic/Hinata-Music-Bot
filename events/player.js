module.exports = (client) => {

    client.player.events.on("playerStart", (queue, track) => {

        console.log(`🎵 Now Playing: ${track.title}`);

    });

    client.player.events.on("emptyChannel", (queue) => {

        queue.delete();

        console.log("🔇 Voice channel empty. Queue deleted.");

    });

    client.player.events.on("disconnect", (queue) => {

        queue.delete();

        console.log("❌ Bot disconnected.");

    });

    client.player.events.on("error", (queue, error) => {

        console.error(error);

    });

};