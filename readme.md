# Base JS

- Como usar?

Coloque as informações do seu bot em .env
Coloque as informações do seu bot de testes em .env

- Como ligar o bot?
npm start - Liga a versão Default do bot
npm run dev - Liga a versão de Testes do seu bot

> A base inclui sistema de shards porem, só usa shards se você ligar o bot na versão default, se ligar na versão de Testes vai ligar sem eles!

Como criar um componente? 

> Exemplo: 
```js
const { ComponentType } = require('discord.js');
const Component = require('../../utils/component'); 
const { db } = require('../../utils/db');
const { translate } = require('../../utils/language')

const languageSelect = new Component({
    customId: 'CUSTOM ID AQUI',
    componentType: ComponentType.StringSelect, // Tipo do componente
    async run(interaction) {
        const { user } = interaction;
        const selectedLanguage = (interaction.values[0]);
        
        const userdb = await db.users.get(user);
        if (userdb.language != selectedLanguage) {
            await db.users.update(user, { language: selectedLanguage });
            await interaction.update({
                content: `${await translate(
                    user.id,
                    "setlanguage.success"
                )}`,
                embeds: [],
                components: []
            });
        } else {
            return interaction.update({
                content: `${await translate(user.id, "setlanguage.sameLanguage")}`,
                embeds: [],
                components: []
            });
        }

    }
});

module.exports = languageSelect;
```

exemplos da função db:

```js
await db.users.get(OBJETO DO USUÁRIO);
await db.guilds.get(OBJETO DA GUILD);
await db.users.update(OBJETO DO USUARIO, { language: "pt-BR" });
```

Lembrando que update, é literalmente update, para um sistema de coins, teria de dar upsert, em breve irei colocar essa opção na função, mas até lá pode usar:

```js
const userDB = await db.users.get(OBJETO DO USUÁRIO);
userDB.coins += quantidadeParaAdicionar;
userDB.save();
```

Função de emoji:

```js
${emoji("NomeDoEmoji")}
```

Se quiser apenas o ID do emoji:
(Depois vou alterar a função do emoji para facilitar)
mas por enquanto basta:

```js
${client.settings.emojis.static/animated.NOMEDOEMOJI}
```