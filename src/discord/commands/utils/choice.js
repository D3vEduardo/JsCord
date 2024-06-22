const { ActionRowBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType } = require("discord.js");
const { Collector } = require("@base")

module.exports = {
    data: new SlashCommandBuilder()
    .setDMPermission(true)
    .setName("choice")
    .setDescription("Escolha uma opção!"),
    execute: async (interaction) => {
        const row = new ActionRowBuilder()
        .setComponents(
            new StringSelectMenuBuilder()
            .setCustomId("choice")
            .setPlaceholder("Escolha uma das opçõs...")
            .setOptions([
                new StringSelectMenuOptionBuilder()
                .setDescription("Inscreva-se no canal!")
                .setLabel("Inscreva-se")
                .setValue("subscribe"),
                new StringSelectMenuOptionBuilder()
                .setLabel("Juntar-se a nós")
                .setDescription("Entrar na D3VS Community.")
                .setValue("join")
            ])
        );

        const reply = await interaction.reply({ components: [row] });

        Collector({
            customId: "choice",
            type: ComponentType.StringSelect,
            run: async collectorInteraction => {
                await collectorInteraction.reply({ content: "Escolheu, agora cumpre. XD" });
                if ( collectorInteraction.values[0] === "subscribe" ) {
                    await interaction.editReply({ content: "[Dev Eduardo](https://youtube.com/@DevEduardo_)" });
                } else {
                    await interaction.editReply({ content: "[D3VS Community](https://discord.gg/6aJG52gPMR)" });
                }
            }
        }, reply)


    }
}