const {
  Client,
  IntentsBitField,
} = require("discord.js");
const { config } = require("dotenv");
config();
require("./base/utils/aliases");
const { RegisterEvents } = require("@base");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages,
  ],
});

RegisterEvents(client)

client.login(process.env.BOT_TOKEN);
