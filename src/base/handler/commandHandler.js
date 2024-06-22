// Importa o módulo fs (file system) para operações com arquivos
const fs = require('fs');

// Importa a classe REST do pacote @discordjs/rest para fazer requisições REST à API do Discord
const { REST } = require('@discordjs/rest');

// Importa os objetos Routes do pacote discord-api-types/v9, que contém as rotas da API do Discord
const { Routes } = require('discord-api-types/v9');

// Importa o módulo path para manipulação de caminhos de arquivos e diretórios
const path = require("path");

// Importa e configura o dotenv para carregar variáveis de ambiente a partir de um arquivo .env
const { config } = require("dotenv");
config(); // Carrega as variáveis de ambiente a partir do arquivo .env

// Função que lê os comandos de um diretório e os adiciona à coleção de comandos
function readCommands(dir, commandCollection) {
    // Lê todos os arquivos e diretórios dentro do diretório especificado
    const files = fs.readdirSync(dir);

    // Itera sobre cada arquivo/diretório encontrado
    for (const file of files) {
        // Cria o caminho completo para o arquivo/diretório atual
        const fullPath = path.join(dir, file);

        // Obtém informações sobre o arquivo/diretório
        const stat = fs.statSync(fullPath);

        // Se for um diretório, chama a função readCommands recursivamente
        if (stat.isDirectory()) {
            readCommands(fullPath, commandCollection);
        // Se for um arquivo JavaScript, importa o comando e o adiciona à coleção
        } else if (file.endsWith('.js')) {
            const command = require(fullPath);
            commandCollection.set(command.data.name, command);
        }
    }
}

// Exporta um objeto com duas funções: registerCommands e handleInteraction
module.exports = {
    // Função assíncrona para registrar comandos
    async registerCommands(client) {
        // Cria uma nova coleção de comandos no cliente
        client.commands = new Map();

        // Lê os comandos do diretório especificado e os adiciona à coleção de comandos do cliente
        readCommands(path.resolve(__dirname, "../../discord/commands"), client.commands);

        // Cria uma nova instância da classe REST e define o token do bot
        const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

        try {
            // Loga uma mensagem indicando que os comandos estão sendo atualizados
            console.log('Started refreshing application {/} commands.');

            // Mapeia os comandos para um formato adequado para a API do Discord
            const commands = Array.from(client.commands.values()).map(cmd => cmd.data.toJSON());

            // Faz uma requisição PUT à API do Discord para registrar os comandos globais
            await rest.put(
                Routes.applicationCommands(client.user.id), // URL da rota da API para registrar comandos
                { body: commands }, // Corpo da requisição contendo os comandos
            );

            // Loga uma mensagem indicando que os comandos foram atualizados com sucesso
            console.log('Successfully reloaded application {/} commands.');
        } catch (error) {
            // Loga qualquer erro que ocorrer durante o registro dos comandos
            console.error(error);
        }
    },

    // Função assíncrona para lidar com interações de comandos
    async handleInteraction(interaction) {
        // Verifica se a interação é um comando; se não for, retorna
        if (!interaction.isCommand()) return;

        // Obtém o comando correspondente ao nome do comando na interação
        const command = interaction.client.commands.get(interaction.commandName);

        // Se o comando não existir, retorna
        if (!command) return;

        try {
            // Executa o comando
            await command.execute(interaction);
        } catch (error) {
            // Loga qualquer erro que ocorrer durante a execução do comando
            console.error(error);

            // Responde à interação informando que ocorreu um erro
            await interaction.reply({ content: `Ocorreu um erro ao executar o comando! ${error}`, ephemeral: true });
        }
    },
};

