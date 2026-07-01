module.exports = (client) => {

    client.player.events.on("playerStart", (queue, track) => {
        console.log(`🎵 Now Playing: ${track.title}`);
    });

    client.player.events.on("emptyChannel", (queue) => {
        console.log("🔇 Voice channel empty.");
    });

    client.player.events.on("disconnect", (queue) => {
        console.log("❌ Bot disconnected.");
    });

    client.player.events.on("error", (queue, error) => {
        console.error("========== PLAYER ERROR ==========");
        console.error(error);
        console.error("==================================");
    });

};