const { registerCommands } = require("@base");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await registerCommands(client);
  },
};
