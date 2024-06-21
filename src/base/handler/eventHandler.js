const fs = require("fs");
const path = require("path");

async function ReadFiles(dir, client) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const fileStats = fs.statSync(fullPath);

    if ( fileStats.isDirectory() ) {
      ReadFiles(fullPath, client);
    } else if ( file.endsWith(".js") ) {
      const event = require(fullPath);
      if ( event.once ) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args))
      }
    }
  }
}

module.exports = {
  RegisterEvents(client) {
    const eventsPath = path.resolve(__dirname, "../../discord/events");
    ReadFiles(eventsPath, client);
  }
}