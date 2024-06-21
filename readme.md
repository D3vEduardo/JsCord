# Como usar?
## Primeiro passo:
Vá em [Discord Developers](https://discord.com/developers/applications) e pegue o **token** do seu bot.
Logo após cole no arquivo `.env` na parte __**BOT_TOKEN**__.

## Como ligar?
Utilize o `node .` em seu terminal para iniciar a aplicação.

## Como criar Slash Commands?
Vá ao seguinte diretório: `./src/discord/commands`.
Se __preferir__ criar **sub-pastas** pode ficar à vontade.
Crie um arquivo com a extenção `.js`.
Dentro do arquivo use o snippet `newSlash` que ele le entregará a base de um slash command para você modificar.
Todo o código que irá ser executado deve estar dentro das `chaves` (`{}`) do `execute`.

## Como criar events?
Vá ao seguinte diretório: `./src/discord/events`.
Se __preferir__ criar **sub-pastas** pode ficar à vontade.
Crie um arquivo com a extenção `.js`.
Dentro do arquivo use o snippet `newEvent` que ele le entregará a base de um event para você modificar.
Todo o código que irá ser executado deve estar dentro das `chaves` (`{}`) do `execute`.

## Como usar o `Collector`?
Basta utilizar o snippet `newCollector` que ele entregará uma base de coletor para você utilizar.
Todo o código que irá ser executado deve estar dentro das `chaves` (`{}`) do `execute`.
