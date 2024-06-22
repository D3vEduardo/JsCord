const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");
const { Collector } = require("@base");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("counter")
    .setDMPermission(true)
    .setDescription("Te envia um contador."),
  execute: async (interaction) => {
    const row = new ActionRowBuilder({
      components: [
        new ButtonBuilder()
          .setCustomId("Counter+1")
          .setLabel("+1")
          .setStyle(ButtonStyle.Primary),
      ],
    });

    let counter = 0;

    /* @type {number} */
    const reply = await interaction.reply({
      content: `> Counter: \`${counter}\``,
      components: [row],
    });
    Collector(
      {
        customId: "Counter+1",
        type: ComponentType.Button,
        run: async (collectorInteraction) => {
          counter++;
          await interaction.editReply({ content: `> Counter: \`${counter}\`` });
          await collectorInteraction.reply({ content: "+1", ephemeral: true })
          setTimeout(async ()=> {
            await collectorInteraction.deleteReply();
          }, 1000 * 3);
        },
      },
      reply
    );
  },
};
