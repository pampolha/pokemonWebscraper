# WebScraper de Pokémons
Um webscraper que resgata informações básicas de um Pokémon na <a href="https://pokemon.fandom.com/pt-br/wiki/Pok%C3%A9dex_Nacional">Pok&eacute;dex Nacional</a>
através de seu nome.
<img src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/Squirtle-Pok%C3%A9mon-PNG.png" alt="Squirtle" width="32%" height="100%">
<img src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/Bulbasauro-Pok%C3%A9mon-PNG.png" alt="Bulbasaur" width="32%" height="100%">
<img src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/Charmander-Pok%C3%A9mon-PNG.png" alt="Charmander" width="32%" height="100%">
## Pré-requisitos <img src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/Pikachu-Pok%C3%A9mon-PNG-983x1024.png" alt="Pikachu apontando com a cauda" width="50px" height="50px" align="right">

* <a href="https://www.npmjs.com/">Node Package Manager</a>

Versão Client
* <a href="https://nodejs.org/en/">Node.js</a> v14

Versão Lambda
* <a href="https://aws.amazon.com/pt/cli/">AWS CLI<a/>

## Construído com <img src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/Pikachu-Pok%C3%A9mon-PNG-983x1024.png" alt="Pikachu apontando com a cauda" width="50px" height="50px" align="right">

Versão Client
* [<a href="https://pptr.dev/">Puppeteer</a>] - API de controle automatizado de instância de navegador chromium, utilizado para navegar e resgatar dados de sites.

Versão Lambda
* [<a href="https://www.npmjs.com/package/puppeteer-core">puppeteer-core</a>] - Biblioteca que possui os módulos principais do Puppeteer, porém sem o navegador embutidos, logo é um pacote muito mais leve e possível de portar para AWS.
* [<a href="https://github.com/alixaxel/chrome-aws-lambda">chrome-aws-lambda</a>] - Navegador chromium específico para uso em ambientes cloud.

## Como usar <img src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/Pikachu-Pok%C3%A9mon-PNG-983x1024.png" alt="Pikachu apontando com a cauda" width="50px" height="50px" align="right">

Apenas inserir o nome do Pokémon. 
Não há sensibilidade de capitalização necessária, porém o nome deve possuir ortografia correta.
Instruções específicas estarão presentes no arquivo .README dentro da pasta de cada versão.

## Exemplo da versão client <img src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/Pikachu-Pok%C3%A9mon-PNG-983x1024.png" alt="Pikachu apontando com a cauda" width="50px" height="50px" align="right">

* Após clonar ou baixar o repositório e executar o arquivo conforme as instruções na <a href="https://github.com/pampolha/pokemonWebscraper/tree/main/client">pasta client</a>, o resultado deve ser parecido com este:

![image](https://user-images.githubusercontent.com/79263044/209584074-7040b8ea-416b-41e9-8064-14421eb3a28b.png)
