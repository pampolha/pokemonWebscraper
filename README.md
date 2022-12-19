# WebScraper de Pokémons

Um webscraper que resgata informações básicas de um Pokémon na <a href="https://pokemon.fandom.com/pt-br/wiki/Pok%C3%A9dex_Nacional">Pok&eacute;dex Nacional</a>
através de seu nome.

### Pré-requisito

* <a href="https://nodejs.org/en/">Node.js</a> 14

## Construído com

Versão Client
* [<a href="https://pptr.dev/">Puppeteer</a>] - API de controle automatizado de instância de navegador chromium, utilizado para navegar e resgatar dados de sites.

Versão Lambda
* [<a href="https://www.npmjs.com/package/puppeteer-core">puppeteer-core</a>] - Biblioteca que possui os módulos principais do Puppeteer, porém sem o navegador embutidos, logo é um pacote muito mais leve e possível de portar para AWS.
* [<a href="https://github.com/alixaxel/chrome-aws-lambda">chrome-aws-lambda</a>] - Navegador chromium específico para uso em ambientes cloud.

## Como usar

Apenas inserir o nome do Pokémon. Não há sensibilidade de capitalização necessária, porém o nome deve possuir ortografia correta.
Instruções específicas estarão presentes no arquivo README de cada versão.
