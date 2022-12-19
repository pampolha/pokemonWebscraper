// Chromium vai ser o ponto de entrada para utilizar o puppeteer nesse programa, devido ao ambiente AWS Lambda
const chromium = require('chrome-aws-lambda');
// resources e um objeto contendo as strings que serao utilizadas no codigo principal
const res = require('./resources.js');

async function scrapePokemon(pokemonName) {
    // Objeto que define o pokemon e suas informacoes
    const pokemon = {
        name: pokemonName,
        number: null,
        type: null,
        category: null,
        height: null,
        weight: null,
        regularAbility: null,
        genderDistribution: null,
    };

    // A invocacao do browser e diferente do padrao puppeteer devido as nuances de incompatibilidade com o puppeteer e o ambiente AWS Lambda. Nesse caso, esse programa usa a combinacao das ferramentas chrome-aws-lambda e puppeteer-core para resolver essa incompatiblidade.
    const browser = await chromium.puppeteer
        .launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true
        });
    // Bloco de try-catch geral para evitar vazamento de memoria do puppeteer em caso de erros
    const page = await browser.newPage();
    // Navega para a pagina da pokedex
    await page.goto(res.pokedexUrl);
    // Esperar a aba e botão de cookies carregar
    await page.waitForSelector(res.cookieSelector);
    // Clicar em aceitar cookies para remover a aba
    await page.click(res.cookieSelector);
    // Tenta obter informacoes completas do pokemon pesquisando seu nome. Porem, a wiki nao possui paginas especificas para todos os pokemons, e nesse caso o programa vai apenas fornecer as informacoes basicas disponiveis na pokedex nacional
    try {
        // Clique em ícone de pesquisa, para abrir a aba de pesquisa
        await page.click(res.searchIconSelector);
        // Esperar a aba de pesquisa carregar
        await page.waitForSelector(res.searchLayerSelector);
        // Pesquisa o pokemon. Delay manual para evitar lags na digitacao do robo
        await page.type(res.searchInputSelector, pokemonName, { delay: 10 });
        // Aguarda os resultados carregarem e ter certeza de que terminou de digitar
        await page.waitForSelector(res.searchResultsSelector);
        await page.waitForTimeout(1000);
        // Clique no primeiro resultado, que sera o pokemon, caso o nome esteja escrito de forma correta
        await page.waitForSelector(res.firstSearchResultSelector, { timeout: 1000 });
        await page.click(res.firstSearchResultSelector);
        // Esperar a tabela de informacoes carregar
        await page.waitForSelector(res.pokemonTableSelector, { timeout: 2000 });
        // Preenchendo as informacoes do pokemon
        pokemon.number = await getElementText(page, res.pokemonNumberSelector);
        pokemon.category = await getElementText(page, res.pokemonCategorySelector);
        pokemon.height = await getElementText(page, res.pokemonHeightSelector);
        pokemon.weight = await getElementText(page, res.pokemonWeightSelector);
        pokemon.genderDistribution = await getElementText(page, res.pokemonGenderDistributionSelector);
        pokemon.regularAbility = await getElementText(page, res.pokemonRegularAbilitySelector);
        pokemon.type = await getChildText(page, res.pokemonTypeCellSelector, res.pokemonTypeChildSelector);
    } catch (error) {
        // Outro try-catch que evita o browser de continuar aberto em erros inesperados
        try {
            // Volta para a pagina da pokedex
            await page.goto(res.pokedexUrl);
            // Seleciona todos os spans de classe "new" dentro de celulas de tabela, que e o padrao para pokemons sem pagina especifica, e entao seleciona o span com o titulo que comeca com o nome do pokemon pesquisado (nao sensivel a capitalizacao)
            const pokemonNameSpanElement = await page.$(`${res.pokemonNameSpanSelector}[title^="${pokemonName}" i]`);
            // Caso nenhuma tag tenha sido encontrada, o nome do pokemon nao foi inserido corretamente. O programa encerra a execucao desse scraping e retorna um erro
            if (!pokemonNameSpanElement) {
                throw new Error('O nome pesquisado não corresponde a nenhum Pokémon.');
            }
            // Caso a tag exista, o programa navega para o elemento parente e entao para o proximo elemento irmao, que contem os tipos do pokemon
            const pokemonTypeArray = await page.evaluate(nameSpan => {
                // Extrai todo o texto interior da celula de tipos e retorna a array deles
                const typeCell = nameSpan.parentElement.nextElementSibling;
                return Array.from(typeCell.innerText.split(' '))
                    .filter(el => el !== '');
            }, pokemonNameSpanElement);
            // Processo semelhante para adquirir o numero do pokemon. Navega para o parente, entao para dois irmaos atras e recolhe o texto
            const pokemonNumber = await page.evaluate(nameSpan => {
                const numberCell = nameSpan.parentElement.previousElementSibling.previousElementSibling;
                return numberCell.textContent;
            }, pokemonNameSpanElement);
            // Preenchendo informacoes basicas do pokemon
            pokemon.type = pokemonTypeArray;
            pokemon.number = pokemonNumber;
        } catch (error) {
            await browser.close();
            throw error;
        }
    }
    // Encerra o browser
    await browser.close();
    // Retorna o objeto bruto do pokemon
    return pokemon;
}
// Funcoes para reduzir código
// Pega o textContent do elemento retornado pela query, ou null caso nao exista
async function getElementText(page, querySelector) {
    return await page.evaluate(element => element?.textContent, await page.$(querySelector));
}
// Como existem pokemons que possuem um ou mais tipos, deve-se capturar os elementos filhos e extrair seu texto para uma array.
async function getChildText(page, querySelector, childQuerySelector) {
    return await page.evaluate((element, childQuerySelector) => {
        return Array.from(element.querySelectorAll(childQuerySelector))
            .map(child => child?.textContent)
    },
        await page.$(querySelector), childQuerySelector);
}
// Faz limpeza dos dados brutos resgatados pela funcao scrapePokemon e retorna o objeto tratado
function cleanupPokemon(pokemon) {
    // Nulifica a categoria se ela equivale ao placeholder do site para categorias desconhecidas
    if (pokemon.category?.match(/Pokémon Desconhecido/)) {
        pokemon.category = null
    }
    const displayPokemon = {
        // Capitaliza o nome do pokemon
        Nome: pokemon.name.split(/ /).map(word => word[0].toUpperCase() + word.substring(1))
            .join(' '),
        Numero: pokemon.number === 'Nº ???' ?
            res.unknownPropertyString : pokemon.number.replace(/\n/, ''),
        Tipo: pokemon.type?.join(', ') ?? res.unknownPropertyString,
        // Existem alguns pokemons com categorias diferentes baseadas em regiao. O programa demonstra a categoria principal
        // O regex abaixo detecta a palavra Pokemon, seguido por um espaço e uma palavra capitalizada, até encontrar outra capitalizacao ou nao. Isso e necessario devido a falta de tag em alguns textos da wiki
        Categoria: RegExp(/Pokémon\s[A-Z][a-z]+|Pokémon\s[A-Z][a-z]+(?=[A-Z])/).exec(pokemon.category)?.[0] ?? res.unknownPropertyString,
        // O regex abaixo detecta uma sequencia de digitos, seguido por uma virgula, outra sequencia de digitos e um 'm' no final
        Altura: RegExp(/\d+,\d+ m/).exec(pokemon.height)?.[0] ?? res.unknownPropertyString,
        // O regex abaixo detecta um digito ou uma sequencia como a de cima, seguido por 'kg'
        Peso: RegExp(/(\d+|(\d+,\d+)) kg/).exec(pokemon.weight)?.[0] ?? res.unknownPropertyString,
        // A habilidade regular e a unica visivel em uma pokedex
        Habilidade: pokemon.regularAbility ?? res.unknownPropertyString,
        Distribuicao_de_genero: pokemon.genderDistribution?.replace(/\n/, '') ?? res.unknownPropertyString
    };
    return displayPokemon;
}
// Handler do AWS Lambda. Essa funcao sera chamada em resposta ao gatilho de execucao
exports.handler = async function (event, context) {
    const pokemonName = event.pokemonName;
    // Procedimento padrao. Chama a funcao scrapePokemon com o nome provido, e entao retorna o log do objeto pokemon limpo pela funcao cleanupPokemon
    try {
        const pokemon = await scrapePokemon(pokemonName);
        return cleanupPokemon(pokemon);
    } catch (err) {
        // Se ocorrer um erro, ele sera logado no console e retornado em um objeto
        console.error(err);
        return { message: `Erro: ${err.message}` };
    }
}