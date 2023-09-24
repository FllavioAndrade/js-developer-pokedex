const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButtom')
const limit = 10;
let offset = 0;
const maxRecords = 1000


function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => 
        `<li class="pokemon ${pokemon.types[0]}">
            <span class="number">#${pokemon.number}</span>
            <span class=name>${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}" >${type}</li>`).join('')}
                </ol>

            <img class="img" src="${pokemon.foto}" alt="${pokemon.name}"></img>
            </div>
        
            <div class="stats">
                <ul class="types">
                    ${pokemon.stats.slice(0,3).map((stat, index) => `<li class="type ${stat}" >${(stat.slice(0, 3)) } = ${pokemon.bases[index]} </li>`).join('')}
                </ul>
                <ul class="types">
                    ${pokemon.stats.slice(3,5).map((stat, index) => `<li class="type ${stat}" >S. ${(stat.slice(8, 11)) } = ${pokemon.bases[index+3]} </li>`).join('')}
                </ul>
            </div>

        </li>
        `).join('')

        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNexPage = offset + limit

    if (qtdRecordNexPage >= maxRecords){
        const newLimit =  maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else{
        loadPokemonItens(offset, limit)
    }
    
}) 
