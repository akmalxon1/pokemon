const totalPokemon = 1000; 
const limit = 100; 
const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=' + limit;

async function fetchPokemons() {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();

        const pokemonPromises = data.results.map(pokemon =>
            fetch(pokemon.url).then(res => res.json())
        );

        const pokemons = await Promise.all(pokemonPromises);
        displayPokemons(pokemons);
    } catch (error) {
        console.error('Fetch error: ', error);
    }
}

function displayPokemons(pokemons) {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = '';

    pokemons.forEach(pokemon => {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.innerHTML = `
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        `;
        container.appendChild(card);
    });
}


fetchPokemons();

