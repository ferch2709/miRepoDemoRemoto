const contenedor = document.getElementById("pokemonContainer");

async function getPokemon() {
    const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
    const datos = await respuesta.json();
    datos.results.forEach(
            pokemon => {fetchDetalles(pokemon.url)}
    );
}

async function fetchDetalles(url) {
    const detalles = await fetch(url);
    const pokemo = await detalles.json();
    createCard(pokemo);
}

function createCard(pokemon){
    const col = document.createElement("div");
    col.className="col-md-4 col-lg-3";
    col.innerHTML = `
    <div class="card h-100 shadow-lg bg-secondary text-white">
        <img src="${pokemon.sprites.other['official-artwork'].front_default}"
        class="card-img-top p-3"
        alt ="${pokemon.name}">
        <div class="card-body text-center">
            <h5 class="card-title text-capitalize">${pokemon.name}</h5>
            <p class="card-text">
                Tipo: ${pokemon.types.map(t => t.type.name).join(", ")}
            </p>
        </div>
    </div>
    `;
    contenedor.appendChild(col);
}

getPokemon();