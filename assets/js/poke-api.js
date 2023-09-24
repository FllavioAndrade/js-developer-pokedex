


const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
 
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const {type} = types

    pokemon.types = types
    pokemon.type = type

    pokemon.foto = pokeDetail.sprites.other.dream_world.front_default;

    const stats = pokeDetail.stats.map((statSlot) => statSlot.stat.name)
    const {stat} = stats

    pokemon.stats = stats
    pokemon.stat = stat

    const bases = pokeDetail.stats.map((baseSlot) => baseSlot.base_stat)
    const {base} = bases

    pokemon.bases = bases
    pokemon.base = base



    return pokemon

}
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)    
}

pokeApi.getPokemons =  (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    //fetch é processamento assincrono (promessa de um resultado)
    return fetch(url) 
        .then((response) => response.json()) //convertee para json retorna uma promess convertida em json do body
        .then((jsonBody) => jsonBody.results) // recebe apenas o result do jsonbody
        .then ((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
}       