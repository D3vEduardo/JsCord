const { handleInteraction } = require("@base");

module.exports = {
    name: "interactionCreate",
    execute(client) {
        handleInteraction(client);
    }
}