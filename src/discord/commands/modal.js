const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ComponentType } = require("discord.js");
const { ReplyModal } = require("@base");

module.exports = {
  data: new SlashCommandBuilder()
    .setDMPermission(true)
    .setName("modal")
    .setDescription("Mostra um modal."),
  execute: async (interaction) => {
    const Modal = new ModalBuilder()
    .setCustomId("Modal")
    .setTitle("The Modal")
    .setComponents([
        new ActionRowBuilder().addComponents([
            new TextInputBuilder()
            .setCustomId("Input 01")
            .setStyle(TextInputStyle.Short)
            .setLabel("Informe algo no campo abaixo:")
            .setPlaceholder("Informe algo aqui!")
            .setRequired(true)
        ])
    ])

    await interaction.showModal(Modal)

    ReplyModal({
        customId: "Modal",
        run: async ModalInteraction => {
            const InputValue = ModalInteraction.fields.getTextInputValue("Input 01");
            await ModalInteraction.reply({ content: InputValue });
        }
    }, interaction)

  },
};
