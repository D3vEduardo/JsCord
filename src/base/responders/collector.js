const { ComponentType } = require("discord.js");
/** 
 * @typedef {Object} Obj
 * @property {string} customId
 * @property {ComponentType} type
 * @property {function(): void} run
 */

/**
 * 
 * @param {Obj} obj 
 * @param {any} interaction 
 */
async function Collector(obj, interaction) {
    const msg = await interaction.fetchReply();
    const collector = msg.createMessageComponentCollector({ time: 1000 * 60 * 1.5, componentType: obj.type })
    collector.on("collect", async i => {
        if (obj.customId !== i.customId) return;
        await obj.run(i);
    });
}

module.exports = Collector;