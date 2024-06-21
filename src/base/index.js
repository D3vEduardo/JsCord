// ? ==> Importar aqui
const path = require("path")

const Collector = require("./responders/collector");
const ReplyModal = require("./responders/reply.modal");
const { registerCommands, handleInteraction } = require(path.join(__dirname, "./handler/commandHandler"));
const { RegisterEvents } = require("./handler/eventHandler");

// ? ==> Exportar aqui

module.exports = { Collector, ReplyModal, registerCommands, handleInteraction, RegisterEvents };