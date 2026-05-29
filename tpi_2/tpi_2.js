// Parte 1

const botonBusqueda = document.getElementById("id_boton_busqueda");

const campoBusqueda = document.getElementById("id_campo_busqueda");

const menuSeries = document.getElementById("id_menu_series");
const menuEstados = document.getElementById("id_menu_estados");
const menuOrden = document.getElementById("id_menu_orden");

const contenedorPersonajes = document.getElementById("id_contenedor_personajes");

const estadisticasPersonajes = document.getElementById("id_estadisticas_personajes");

const listaFavoritos = document.getElementById("id_lista_favoritos");
const favoritosGuardados = localStorage.getItem("favoritos");

botonBusqueda.addEventListener("click", () => {
    const campoResultado = campoBusqueda.value;
    const menuSeriesResultado = menuSeries.value;
    //console.log(campoResultado);
    //console.log(menuResultado);

    const menuEstadosResultado = menuEstados.value;

    /*
    contenedorPersonajes.innerHTML = `
        <p>Nombre: ${campoResultado}</p>
        <p>Serie: ${menuResultado}</p>
    `;
    */

    if (favoritosGuardados) {
        listaFavoritos.innerHTML = `
            <p>Lista favoritos: ${favoritosGuardados}</p>
        `;
    } else {
        listaFavoritos.innerHTML = `
            <p>Lista favoritos: (No hay favoritos guardados actualmente).</p>
        `;
    }

    if (menuSeriesResultado === "Rick and Morty") {
        obtenerPersonajeRick(campoResultado, menuEstadosResultado, menuOrden);
    } else if (menuSeriesResultado === "Los Simpsons") {
        obtenerPersonajeSimpsons();
    } else if (menuSeriesResultado === "Ambas") {
        obtenerAmbas();
    }
});

// Parte 2

async function obtenerPersonajeRick(campoResultado, menuEstadosResultado, menuOrden) {
    //console.log(campoResultado);

    try {
        const url = campoResultado
            ? `https://rickandmortyapi.com/api/character/?name=${campoResultado}`
            : `https://rickandmortyapi.com/api/character`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        const personaje = data.results;
        //console.log(personaje);

        if (menuEstadosResultado === "Vivo") {
            const vivos = personaje.filter(p => p.status === "Alive");
            console.log(vivos);
        } else if (menuEstadosResultado === "Muerto") {
            const muertos = personaje.filter(p => p.status === "Dead");
            //console.log(muertos);
        } else if (menuEstadosResultado === "Desconocido") {
            const desconocido = personaje.filter(p => p.status === "unknown");
            //console.log(desconocido);
        }

        if (menuOrden === "A-Z") {
            personaje.sort();
            console.log(personaje);
        } else if (menuOrden === "Z-A") {
            personaje.sort().reverse();
            console.log(personaje);
        }

        contenedorPersonajes.innerHTML = `
            <p>ID:</p>
            <p>Nombre: ${campoResultado}</p>
        `;
    } catch (error) {
        contenedorPersonajes.innerHTML = `
            <p>No se encontraron personajes: ${error.message}</p>
        `;
    }
}

async function obtenerPersonajeSimpsons() {
    try {
        const url = `https://thesimpsonsapi.com/api/characters`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        console.log(data.results);
    } catch (error) {
        contenedorPersonajes.innerHTML = `
            <p>No se encontraron personajes: ${error.message}</p>
        `;
    }
}

async function obtenerAmbas() {
    const [res1, res2] = await Promise.all([
        fetch(`https://rickandmortyapi.com/api/character`),
        fetch(`https://thesimpsonsapi.com/api/characters`)
    ]);

    const [data1, data2] = await Promise.all([
        res1.json(),
        res2.json()
    ]);
    console.log(data1.results);
    console.log(data2.results);
}