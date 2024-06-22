const path = require("path");
const alias = require("module-alias");

alias.addAlias("@base", path.join(__dirname, ".."));
alias.addAlias("@colors", path.resolve(__dirname, "../../../settings.json"));
alias.addAlias("@index", path.join(__dirname, "../.."));


/*const path = require("path");
const alias = require("module-alias");

// Define os aliases
alias.addAliases({
  "@base": path.resolve(__dirname, "../"), // Ajuste para apontar para o diretório correto
  "@index": path.resolve(__dirname, "../../index.js")
});
*/