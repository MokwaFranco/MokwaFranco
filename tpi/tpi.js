const campo = document.getElementById("campo-busqueda");

const boton = document.getElementById("boton-busqueda");

const menuDatos = document.getElementById("menu-datos");
const menuEstados = document.getElementById("menu-estados");
const menuOrden = document.getElementById("menu-orden");

const contenedorResultados = document.getElementById("contenedor-resultados");
const contenedorEstadisticas = document.getElementById("contenedor-estadisticas");
const contenedorFavoritos = document.getElementById("contenedor-favoritos");

boton.addEventListener("click", () => {
    const campoResultado = campo.value;
    
    const menuDatosResultado = menuDatos.value;
    const menuEstadosResultado = menuEstados.value;
    const menuOrdenResultado = menuOrden.value;

    if (menuDatosResultado === "opcion-rm") {
        obtenerPersonajeRM(
            campoResultado,
            menuEstadosResultado,
            menuOrdenResultado
        );
    } else if (menuDatosResultado === "opcion-simpson") {
        obtenerPersonajeSimpson(
            menuEstadosResultado,
            menuOrdenResultado
        );
    } else if (menuDatosResultado === "opcion-ambas") {
        obtenerAmbas(
            menuEstadosResultado,
            menuOrdenResultado
        );
    }
});

async function obtenerPersonajeRM(
    campoResultado,
    menuEstadosResultado,
    menuOrdenResultado
) {
    //console.log(campoResultado);

    try {
        const url = campoResultado
            ? `https://rickandmortyapi.com/api/character/?name=${campoResultado}`
            : `https://rickandmortyapi.com/api/character`;
        
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        //console.log(data.results);

        let listado = data.results;

        if (menuEstadosResultado === "opcion-vivos") {
            listado = listado.filter(l => l.status === "Alive");
            //console.log(listado);
        } else if (menuEstadosResultado === "opcion-muertos") {
            listado = listado.filter(l => l.status === "Dead");
        } else if (menuEstadosResultado === "opcion-desconocidos") {
            listado = listado.filter(l => l.status === "unknown");
        }

        if (menuOrdenResultado === "opcion-ascendente") {
            listado = listado.sort((a, b) => a.name.localeCompare(b.name));
        } else if (menuOrdenResultado === "opcion-descendente") {
            listado = listado.sort((a, b) => b.name.localeCompare(a.name));
        }

        contenedorResultados.innerHTML = `
                <h2>Resultados</h2>
        `;

        listado.forEach(l => {
            const rm = {
                id: l.id,
                nombre: l.name,
                imagen: l.image,
                estado: l.status,
                genero: l.gender,
                especie: l.species,
                origen: "Rick and Morty"
            };
            //console.log(rm);

            contenedorResultados.innerHTML += `
                <img src="${rm.imagen}"><br><br>
                <button id="boton-favorito-${rm.id}">Favorito</button>
                <h3>${rm.nombre}</h3>
                <p>Estado: ${rm.estado}</p>
                <p>Genero: ${rm.genero}</p>
                <p>Especie: ${rm.especie}</p>
                <p>Origen: ${rm.origen}</p>
            `;

            const botonFavorito = document.getElementById(`boton-favorito-${rm.id}`);

            botonFavorito.addEventListener("click", () => {
                agreagrFavoritos(rm);
            });
        });

        contenedorEstadisticas.innerHTML = `
            <h2>Estadisticas</h2>

            <p>Total personajes cargados: ${listado.length}</p>
        `;
    } catch (error) {
        contenedorResultados.innerHTML = `
            <p>${error.message}</p>
        `;
    }
}

async function obtenerPersonajeSimpson(
    menuEstadosResultado,
    menuOrdenResultado
) {
    //console.log(campoResultado);

    try {
        const response = await fetch(`https://thesimpsonsapi.com/api/characters`);

        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        //console.log(data.results);

        let listado = data.results;

        if (menuEstadosResultado === "opcion-vivos") {
            listado = listado.filter(l => l.status === "Alive");
        } else if (menuEstadosResultado === "opcion-muertos") {
            listado = listado.filter(l => l.status === "Dead");
        } else if (menuEstadosResultado === "opcion-desconocidos") {
            listado = listado.filter(l => l.status === "unknown");
        }

        if (menuOrdenResultado === "opcion-ascendente") {
            listado = listado.sort((a, b) => a.name.localeCompare(b.name));
        } else if (menuOrdenResultado === "opcion-descendente") {
            listado = listado.sort((a, b) => b.name.localeCompare(a.name));
        }

        contenedorResultados.innerHTML = ``;

        if (listado.length === 0) {
            contenedorResultados.innerHTML = `
                <h2>No se encontraron resultados.</h2>
            `
        } else {
            contenedorResultados.innerHTML = `
                <h2>Resultados</h2>
            `;

            listado.forEach(l => {
                const simpson = {
                    id: l.id,
                    nombre: l.name,
                    imagen: `https://cdn.thesimpsonsapi.com/200${l.portrait_path}`,
                    estado: l.status,
                    genero: l.gender,
                    ocupacion: l.occupation,
                    origen: "Los Simpson"
                };
                //console.log(simpson);

                contenedorResultados.innerHTML += `
                    <img src="${simpson.imagen}"><br><br>
                    <button id="boton-favorito-${simpson.id}">Favorito</button>
                    <h3>${simpson.nombre}</h3>
                    <p>Estado: ${simpson.estado}</p>
                    <p>Genero: ${simpson.genero}</p>
                    <p>Ocupacion: ${simpson.ocupacion}</p>
                    <p>Origen: ${simpson.origen}</p>
                `;

                const botonFavorito = document.getElementById(`boton-favorito-${simpson.id}`);

                botonFavorito.addEventListener("click", () => {
                    agreagrFavoritos(simpson);
                });
            });

            /*
            listado.forEach(l => {
                const botonFavorito = document.getElementById(`boton-favorito-${l.id}`);

                botonFavorito.addEventListener("click", () => {
                    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

                    favoritos.push({
                        id: l.id,
                        nombre: l.name
                    });

                    localStorage.setItem(
                        "favoritos",
                        JSON.stringify(favoritos)
                    );

                    console.log("Agregado a favoritos");
                    console.log(favoritos);
                });
            });
            */

            const generos = listado.reduce((acumulador, p) => {
                const genero = p.gender;

                acumulador[genero] = (acumulador[genero] || 0) + 1;

                return acumulador;
            }, {});
            //console.log(generos["Male"]);

            const estados = listado.reduce((acumulador, p) => {
                const estado = p.status;

                acumulador[estado] = (acumulador[estado] || 0) + 1;

                return acumulador;
            }, {})
            //console.log(estados["Alive"]);

            contenedorEstadisticas.innerHTML = `
                <h2>Estadisticas</h2>

                <p>Total personajes cargados: ${listado.length}</p>

                <h3>Totales por genero</h3>
                <p>Masculinos: ${generos["Male"]}</p>
                <p>Femeninos: ${generos["Female"]}</p>

                <h3>Totales por estado</h3>
                <p>Vivos: ${estados["Alive"]}</p>
                <p>Muertos: ${estados["Dead"] || 0}</p>
                <p>Desconocidos: ${estados["unknown"] || 0}</p>
            `;
        }
    } catch (error) {
        contenedorResultados.innerHTML = `
            <p>${error.message}</p>
        `;
    }
}

/*
async function obtenerAmbas(
    menuEstadosResultado,
    menuOrdenResultado
) {
    //console.log(campoResultado);

    try {
        const [res1, res2] = await Promise.all([
            fetch(`https://rickandmortyapi.com/api/character`),
            fetch(`https://thesimpsonsapi.com/api/characters`)
        ]);

        if (!res1.ok) throw new Error(res1.status);
        if (!res2.ok) throw new Error(res2.status);

        const [data1, data2] = await Promise.all([
            res1.json(),
            res2.json()
        ]);
        //console.log(data1.results, data2.results);

        let listadoRM = data1.results;
        let listadoSimpson = data2.results;
        let listado = [listadoRM, listadoSimpson];
        //console.log(listado);

        if (menuEstadosResultado === "opcion-vivos") {
            listadoRM = listadoRM.filter(l => l.status === "Alive");
            listadoSimpson = listadoSimpson.filter(l => l.status === "Alive");
        } else if (menuEstadosResultado === "opcion-muertos") {
            listadoRM = listadoRM.filter(l => l.status === "Dead");
            listadoSimpson = listadoSimpson.filter(l => l.status === "Dead");
        } else if (menuEstadosResultado === "opcion-desconocidos") {
            listadoRM = listadoRM.filter(l => l.status === "unknown");
            listadoSimpson = listadoSimpson.filter(l => l.status === "unknown");
        }

        if (menuOrdenResultado === "opcion-ascendente") {
            listadoRM = listadoRM.sort((a, b) => a.name.localeCompare(b.name));
            listadoSimpson = listadoSimpson.sort((a, b) => a.name.localeCompare(b.name));
        } else if (menuOrdenResultado === "opcion-descendente") {
            listadoRM = listadoRM.sort((a, b) => b.name.localeCompare(a.name));
            listadoSimpson = listadoSimpson.sort((a, b) => a.name.localeCompare(b.name));
        }

        contenedorResultados.innerHTML = `
            <h2>Resultados</h2>
        `;

        listadoRM.forEach(l => {
            const rm = {
                id: l.id,
                nombre: l.name,
                imagen: l.image,
                estado: l.status,
                genero: l.gender,
                especie: l.species,
                origen: "Rick and Morty"
            };
            //console.log(rm);

            contenedorResultados.innerHTML += `
                <img src="${rm.imagen}">
                <h3>${rm.nombre}</h3>
                <p>Estado: ${rm.estado}</p>
                <p>Genero: ${rm.genero}</p>
                <p>Especie: ${rm.especie}</p>
                <p>Origen: ${rm.origen}</p><br>
            `;
        });

        listadoSimpson.forEach(l => {
            const simpson = {
                id: l.id,
                nombre: l.name,
                imagen: `https://cdn.thesimpsonsapi.com/200${l.portrait_path}`,
                estado: l.status,
                genero: l.gender,
                ocupacion: l.occupation,
                origen: "Los Simpson"
            };
            //console.log(simpson);

            contenedorResultados.innerHTML += `
                <img src="${simpson.imagen}">
                <h3>${simpson.nombre}</h3>
                <p>Estado: ${simpson.estado}</p>
                <p>Genero: ${simpson.genero}</p>
                <p>Ocupacion: ${simpson.ocupacion}</p>
                <p>Origen: ${simpson.origen}</p>
            `;
        });

        contenedorEstadisticas.innerHTML = `
            <h2>Estadisticas</h2>

            <p>Total personajes cargados: ${(listadoRM.length + listadoSimpson.length)}</p>
        `
    } catch (error) {
        contenedorResultados.innerHTML = `
            <p>${error.message}</p>
        `;
    }
}
*/

async function obtenerAmbas(
    menuEstadosResultado,
    menuOrdenResultado
) {
    //console.log(campoResultado);

    try {
        const [res1, res2] = await Promise.all([
            fetch(`https://rickandmortyapi.com/api/character`),
            fetch(`https://thesimpsonsapi.com/api/characters`)
        ]);

        if (!res1.ok) throw new Error(res1.status);
        if (!res2.ok) throw new Error(res2.status);

        const [data1, data2] = await Promise.all([
            res1.json(),
            res2.json()
        ]);

        let listado = [...data1.results, ...data2.results];
        //console.log(listado);

        if (menuEstadosResultado === "opcion-vivos") {
            listado = listado.filter(l => l.status === "Alive");
        } else if (menuEstadosResultado === "opcion-muertos") {
            listado = listado.filter(l => l.status === "Dead");
        } else if (menuEstadosResultado === "opcion-desconocidos") {
            listado = listado.filter(l => l.status === "unknown");
        }
        //console.log(listado);

        if (menuOrdenResultado === "opcion-ascendente") {
            listado = listado.sort((a, b) => a.name.localeCompare(b.name));
        } else if (menuOrdenResultado === "opcion-descendente") {
            listado = listado.sort((a, b) => b.name.localeCompare(a.name));
        }
        //console.log(listado);

        contenedorResultados.innerHTML = `
            <h2>Resultados</h2>
        `;

        listado.forEach(l => {
            const personaje = {
                id: l.id,
                nombre: l.name,
                imagen: `${l.image || `https://cdn.thesimpsonsapi.com/200${l.portrait_path}`}`,
                estado: l.status,
                genero: l.gender,
                detalle: `${l.species || l.occupation}`,
                origen: ""
            };

            contenedorResultados.innerHTML += `
                <img src="${personaje.imagen}"><br><br>
                <button id="boton-favorito-${personaje.id}">Favorito</button>
                <h3>${personaje.nombre}</h3>
                <p>Estado: ${personaje.estado}</p>
                <p>Genero: ${personaje.genero}</p>
                <p>Detalle: ${personaje.detalle}</p>
                <p>Origen: ${personaje.origen}</p><br>
            `;

            const botonFavorito = document.getElementById(`boton-favorito-${personaje.id}`);

            botonFavorito.addEventListener("click", () => {
                agreagrFavoritos(personaje);
            });
        });

        contenedorEstadisticas.innerHTML = `
            <h2>Estadisticas</h2>

            <p>Total personajes cargados: ${listado.length}</p>
        `;
    } catch (error) {
        contenedorResultados.innerHTML = `
            <p>${error.message}</p>
        `;
    }
}

function agreagrFavoritos(personaje) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const existe = favoritos.some(f => f.id === personaje.id);

    if (!existe) {
        favoritos.push(personaje);

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );

        console.log("Agregado a favoritos");
    } else {
        console.log("Ya existe en favoritos");
    }
}