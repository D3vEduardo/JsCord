const {
  Client,
  IntentsBitField,
  WebhookClient,
  EmbedBuilder,
  Events,
} = require("discord.js");
const { config } = require("dotenv");
config();
require("./base/utils/aliases");
const { RegisterEvents } = require("@base");
const colors = require("@colors");

// ! Dividindo o código

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages,
  ],
});

module.exports = { client };

client.on("ready", async (client) => {
  const { registerCommands } = require("@base");
  await registerCommands(client);
});

client.on("interactionCreate", (interaction) => {
  const { handleInteraction, HandleInteractionReplier } = require("@base");
  if (interaction.isCommand()) {
    handleInteraction(interaction);
    return;
  } else {
    HandleInteractionReplier(interaction);
    return;
  }
});

RegisterEvents(client);

client.login(process.env.BOT_TOKEN);
