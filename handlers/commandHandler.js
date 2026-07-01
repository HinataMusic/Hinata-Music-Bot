const fs = require("fs");
const path = require("path");

module.exports = (client) => {

    const commandsPath = path.join(__dirname, "..", "commands");

    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {

        try {

            const command = require(path.join(commandsPath, file));

            if (!command.data) {
                console.log(`❌ ${file} missing data`);
                continue;
            }

            if (!command.execute) {
                console.log(`❌ ${file} missing execute`);
                continue;
            }

            client.commands.set(command.data.name, command);

            console.log(`✅ Loaded ${command.data.name}`);

        } catch (err) {

            console.log(`❌ Error loading ${file}`);
            console.error(err);

        }

    }

};