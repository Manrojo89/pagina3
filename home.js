const apiKey = '48a2214087a61025d3ca0ba5b71eed7e';

function mostrarPeliculas (url, titulo, tipo) {
    const peliculasContainer =  document.getElementById('peliculas-container');
    const sectionTitle = document.getElementById('section-title');

    fetch (url)
    .then(response => response.json())
    .then(data => {
        const peliculas = data. results.slice(0,4);
        sectionTitle.textContent = titulo;

        peliculasContainer.innerHTML ='';

        peliculas.forEach(pelicula => {
            const peliculaElement = document.createElement('div');
            peliculaElement.classList.add('pelicula');
            
            const tituloPelicula = tipo === 'peliculas' ? pelicula.title : pelicula.name;


            peliculaElement.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${tituloPelicula}">
                    <h3>${tituloPelicula}</h3>
                    <button class="movies__proximamente"><span class="resaltado-2">HD</span></button>
                    <i class="fa-regular fa-clock movies__proximamente reloj">&nbsp; 169 MIN </i>

                    `;
                    

                    peliculasContainer.appendChild(peliculaElement);
            
        });
    })

    .catch(error => console.error('Error al cargar las películas:', error));

}

const urls = {
    peliculas: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=es-MX&page=1`,
    series: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=es-MX&page=1`,
    anime: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=es-MX&with_genres=16` 

};


document.getElementById('btn-peliculas').addEventListener ('click', () => {
    mostrarPeliculas(urls.peliculas, 'Próximas Películas', 'peliculas');
})

document.getElementById('btn-series').addEventListener ('click', () => {
    mostrarPeliculas(urls.series, 'Próximas Series', 'series');
})

document.getElementById('btn-anime').addEventListener ('click', () => {
    mostrarPeliculas(urls.anime, 'Próximos Animes', 'anime');
})

mostrarPeliculas(urls.peliculas, 'Próximas Películas', 'peliculas');


function mostrarPeliculas2(url, titulo, tipo) {
    const peliculasContainer = document.getElementById('proximas-peliculas-container');
    const sectionTitle = document.getElementById('section-title2');


    fetch (url)
    .then(response => response.json())
    .then(data => {
        const peliculas = data.results.slice(0, 8);
        sectionTitle.textContent = titulo;

        peliculasContainer.innerHTML = '';

        peliculas.forEach(pelicula => {
            const peliculaElement = document.createElement('div');
            peliculaElement.classList.add('pelicula_2');

            const tituloPelicula = tipo === 'peliculas' || tipo === 'documentales'? pelicula.title : pelicula.name;
            const year = tipo === 'peliculas'  || tipo === 'documentales' ? pelicula.release_date.substring(0) : pelicula.first_air_date.substring(0, 4)


            peliculaElement.innerHTML =  `
             <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${tituloPelicula}">
                <div class="pelicula-info">
                    <h3>${tituloPelicula}</h3>
                    <p class="pelicula-year">${year}</p>
                </div>
                <button class="movies__proximamente"><span class="resaltado-2">HD</span></button>
            `;

            peliculasContainer.appendChild(peliculaElement);
        });
    })

    .catch(error => console.error('Error al cargar las películas:', error));

}

const urls2 = {
    peliculas: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=1`,
    series: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=es-MX&page=1`,
    documentales: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-MX&with_genres=99`, // Documentales
    deportes: `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=es-MX&page=1` // Usamos top_rated para deportes
};

document.getElementById('btn-peliculas-2').addEventListener('click', () => {
    mostrarPeliculas2(urls2.peliculas, 'Películas Más Populares', 'peliculas')
});

document.getElementById('btn-series-2').addEventListener('click', () => {
    mostrarPeliculas2(urls.series, 'Series Más Populares', 'series');
});

document.getElementById('btn-documentales').addEventListener('click', () => {
    mostrarPeliculas2(urls2.documentales, 'Documentales Más Populares', 'documentales');
});

document.getElementById('btn-deportes').addEventListener('click', () => {
    mostrarPeliculas2(urls2.deportes, 'Top rankeadas', 'deportes');
});


mostrarPeliculas2(urls2.peliculas, 'Películas Más Populares', 'peliculas');

function obtenerSeriesAiringToday(cantidad) {
    const url = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=48a2214087a61025d3ca0ba5b71eed7e&language=es-MX&page=1';
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById('proximas-series-container_3');
            contenedor.innerHTML = '';

            data.results.slice(0, cantidad).forEach(serie => {
                const item = document.createElement('div');
                item.classList.add('pelicula-item_3');

                const titulo = document.createElement('h3');
                titulo.textContent = serie.name;


                const fecha = document.createElement('p');
                fecha.textContent = `Fecha de lanzamiento: ${serie.first_air_date}`;

                const imagen = document.createElement('img');
                imagen.src = `https://image.tmdb.org/t/p/w500${serie.poster_path}`;
                imagen.alt = `Poster de ${serie.name}`;

                item.appendChild(imagen);
                item.appendChild(titulo);
                item.appendChild(fecha);

                contenedor.appendChild(item);


            });
        })
        .catch(error => console.error('Error al obtener las series:', error));
}

obtenerSeriesAiringToday(4);
  
  
