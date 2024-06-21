/**
 * 
 * @typedef {Object} Obj
 * @property {string} customId
 * @property {function(): void} run
 */
/**
 * 
 * @param {Obj} obj 
 */

module.exports = async function ReplyModal(obj, interaction) {
    const filter = i => i.customId === obj.customId;
    interaction.awaitModalSubmit({filter,time: 30_000}).then(
        async modalInteraction => {
            obj.run(modalInteraction);
        }
    );
}