const players = new Map();

module.exports = {

    set(guildId, data) {
        players.set(guildId, data);
    },

    get(guildId) {
        return players.get(guildId);
    },

    delete(guildId) {
        players.delete(guildId);
    },

    has(guildId) {
        return players.has(guildId);
    }

};