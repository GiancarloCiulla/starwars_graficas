//Ejercicio - Gráficas con Star Wars

// Pediremos las películas de Star Wars y pintaremos una gráfica de líneas en la que podamos ver cada una de las películas.
// En el eje X el nombre de la película
// En el eje Y año de publicación
// API ENDPOINT --> https://swapi.dev/api/films/
// async function obtenerPeliculas(movies) {
//     try {
//         let response = await fetch(`https://swapi.dev/api/films/`);
//         if (!response.ok) throw new Error("Películas no encontradas");

//         let data = await response.json();
//         // Mapeamos los datos para obtener títulos y años de publicación
//         let movies = data.results.map(film => ({
//             name: film.title,
//             year: new Date(film.release_date).getFullYear(),
//         }));

//         return movies;
//     } catch (error) {
//         console.log(`ERROR: ${error.message}`);
//         return null; // Retornar null si hay un error
//     }
// }
// async function cargarGrafica() {
//     const movies = await obtenerPeliculas();
//     if (movies) {
//         crearGrafica(movies);
//     }
// }
// Función asíncrona para obtener las películas de la API de Star Wars
async function obtenerPeliculas() {
    try {
        let response = await fetch(`https://swapi.dev/api/films/`);
        if (!response.ok) throw new Error("Películas no encontradas");

        let data = await response.json();
        let movies = data.results.map(film => ({
            name: film.title, // Extraer el título de la película
            year: new Date(film.release_date).getFullYear(), // Extraer el año de lanzamiento
        }));

        return movies;
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
        return null;
    }
}

// Función asíncrona para cargar y graficar las películas
async function cargarGraficaPeliculas() {
    const movies = await obtenerPeliculas();
    if (movies) {
        crearGraficaPeliculas(movies);
    }
}

// Función para crear la gráfica de películas
function crearGraficaPeliculas(movies) {
    const labels = movies.map(movie => movie.name);
    const years = movies.map(movie => movie.year);

    new Chartist.Line('.ct-chart_peliculas', {
        labels: labels,
        series: [years],
        
    }, {
        low: 1977,
        showArea: true,
        fullWidth: true,
    });
}
document.addEventListener('DOMContentLoaded', () => {
    cargarGraficaPeliculas(); // Cargar la gráfica de películas
    //cargarGraficaPersonajes(); // Cargar la gráfica de personajes
});
async function graficaPersonajes() {
    try {
        const response = await fetch(`https://swapi.dev/api/people/`)
        if (!response.ok) throw error("no existe")
            let data = await response.json()
        let resultado = data.results
        let personajes = resultado.map(nombre => nombre.name)
        let films = resultado.map (films =>films.films)
        let numeroFilms = films.map (numero => numero.length)
        return [personajes, numeroFilms]

}catch (error) {
    console.log(`ERROR: ${error.message}`);
    return null;
}
}

graficaPersonajes().then(datos => {
    new Chartist.Line('.ct-chart', {
        labels: datos[0],
        series: [datos[1]]
         
        
      }, {
        low: 0,
        showArea: true
      });

    });

