const resources = {
    pokedexUrl: 'https://pokemon.fandom.com/pt-br/wiki/Pok%C3%A9dex_Nacional',
    cookieSelector: 'body > div > div > div > div._1r08nyekFdI7_2d8r3AIBf > div.NN0_TB_DIsNmMHgJWgT7U.XHcr6qf5Sub2F2zBJ53S_',
    searchIconSelector: 'body > div.main-container > div.resizable-container > div.community-header-wrapper > header > div > div.wiki-tools.wds-button-group > a.wds-button.wds-is-secondary.is-hidden-on-smaller-breakpoints.wiki-tools__search',
    searchLayerSelector: 'body > div.search-modal > div.search-modal__content',
    searchInputSelector: 'body > div.search-modal > div > form > input.SearchInput-module_input__LhjJF',
    searchResultsSelector: 'body > div.search-modal > div > ul.SearchResults-module_results__k8itn',
    firstSearchResultSelector: 'body > div.search-modal > div > ul > li:nth-child(1) > a',
    pokemonTableSelector: '#mw-content-text > div > table[align="right"]',
    pokemonNumberSelector: '#mw-content-text > div > table[align="right"] > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(1) > big > b',
    pokemonTypeCellSelector: '#mw-content-text > div > table[align="right"] > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td:nth-child(2)  > table:nth-of-type(1)',
    pokemonTypeChildSelector: 'font',
    pokemonCategorySelector: '#mw-content-text > div > table[align="right"] > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td:nth-child(1)',
    pokemonHeightSelector: '#mw-content-text > div > table[align="right"] > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(5) > td:nth-child(1)',
    pokemonWeightSelector: '#mw-content-text > div > table[align="right"] > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(5) > td:nth-child(2)',
    pokemonRegularAbilitySelector: '#mw-content-text > div > table[align="right"] > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(7) > td > table:nth-of-type(1) > tbody > tr > td:nth-child(1) > small + br + *',
    pokemonGenderDistributionSelector: '#mw-content-text > div > table[align="right"] > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(9) > td',
    pokemonNameSpanSelector: 'td > span.new',
    pokemonTypePokedexChildSelector: 'span > a:nth-child(2) > font',
    dumpFilePath: './pokemonScrapDump.txt',
    errorMessage: 'Ops! Houve um erro ao tentar obter as informações desse pokémon.\n' + 'Verifique se você digitou o nome corretamente, ou se a url está de pé.\n',
    unknownPropertyString: 'Desconhecido/Não informado'
}

module.exports = resources;