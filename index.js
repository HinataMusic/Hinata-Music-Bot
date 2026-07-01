require("dotenv").config();

const {
    Client,
    Collection,
    GatewayIntentBits,
    Events
} = require("discord.js");

const { Player } = require("discord-player");
const { DefaultExtractors } = require("@discord-player/extractor");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.commands = new Collection();

client.player = new Player(client);

(async () => {
    await client.player.extractors.loadMulti(DefaultExtractors);
})();

// Load handlers
require("./handlers/commandHandler")(client);
require("./handlers/eventHandler")(client);

// Ready
client.once(Events.ClientReady, () => {

    console.log(`✅ Logged in as ${client.user.tag}`);

});

// Slash Commands
client.on(Events.InteractionCreate, async interaction => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {

        await command.execute(interaction);

    } catch (err) {

        console.error(err);

        if (interaction.deferred || interaction.replied) {

            interaction.followUp({
                content: "❌ Error while executing command.",
                ephemeral: true
            });

        } else {

            interaction.reply({
                content: "❌ Error while executing command.",
                ephemeral: true
            });

        }

    }

});

client.login(process.env.TOKEN);
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hinata Music Bot Online");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});