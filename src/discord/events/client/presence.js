const { ActivityType } = require("discord.js")

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        const customEmojiId = '1253739842634780752';
        client.user.setPresence({
            activities: [{name: "JsCord em breve...", emoji: customEmojiId, type: ActivityType.Custom}],
            status: "dnd"
        })
    }
}