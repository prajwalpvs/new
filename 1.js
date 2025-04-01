document.getElementById('fetch-pokemon').addEventListener('click', fetchPokemon);

function fetchPokemon() {
    const pokemonContainer = document.getElementById('pokemon-container');
    const button = document.getElementById('fetch-pokemon');

    // Disable button and show spinner
    button.disabled = true;
    pokemonContainer.innerHTML = `
        <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;

    // Generate random ID (1 to 1000)
    const randomId = Math.floor(Math.random() * 1000) + 1;

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        .then(response => response.json())
        .then(data => {
            // Build type badges
            const typeBadges = data.types
                .map(type => `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`)
                .join('');

            // Create Pokémon card
            pokemonContainer.innerHTML = `
                <div class="col-md-4 pokemon-card">
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <h2>${data.name}</h2>
                    <p>ID: ${data.id}</p>
                    <div>${typeBadges}</div>
                </div>
            `;
            button.disabled = false; // Re-enable button
        })
        .catch(error => {
            console.error('Error fetching Pokémon:', error);
            pokemonContainer.innerHTML = '<p class="text-danger">Oops! Failed to catch a Pokémon.</p>';
            button.disabled = false;
        });
}