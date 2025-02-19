const apiKey = '48a2214087a61025d3ca0ba5b71eed7e';
const peliculasContainer = document.getElementById('peliculas-container-2');
const sectionTitle = document.getElementById('section-title-2');
const paginationContainer = document.getElementById('pagination');


const urls = {
    peliculas: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=es-MX&page=`,
    series: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=es-MX&page=`,
    anime: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=es-MX&with_genres=16&page=`
  };

  function mostrarPeliculas(url, titulo, tipo, page = 1) {
    fetch(url + page)
      .then(response => response.json())
      .then(data => {
        const peliculas = data.results.slice(0, 4);
        sectionTitle.textContent = titulo;
        peliculasContainer.innerHTML = '';

        peliculas.forEach(pelicula => {
            const peliculaElement = document.createElement('div');
            peliculaElement.classList.add('pelicula');
            const tituloPelicula = tipo === 'peliculas' ? pelicula.title : pelicula.name;

            peliculaElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${tituloPelicula}">
            <h3>${tituloPelicula}</h3>
            <button class="movies__proximamente"><span class="resaltado-2">HD</span></button>
            <i class="fa-regular fa-clock movies__proximamente reloj">&nbsp; 169 MIN </i>
            <div class="overlay">
              <button class="btn-overlay" onclick="reproducirTrailer('znk2OICHbjY')">Ver ahora</button>
        <button class="btn-overlay" onclick="window.location.href='URL_DE_TU_SECCION'">Detalles</button> <!-- Cambia URL_DE_TU_SECCION por la ruta deseada -->
            </div>`;
          
          

          peliculasContainer.appendChild(peliculaElement);            
        });

        crearPaginacion(data.total_pages, page, (newPage) => 
            mostrarPeliculas(url, titulo, tipo, newPage)
          );
    })

    .catch(error => console.error('Error al cargar las películas:', error));
}


function crearPaginacion(totalPages, currentPage, onPageChange) {
    paginationContainer.innerHTML = '';


    for (let i = 1; i <= Math.min(totalPages, 4); i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.toggle('active', i === currentPage);

        button.addEventListener('click', () => onPageChange(i));
        paginationContainer.appendChild(button);
    }
}

function reproducirTrailer(videoId) {
    const trailerIframe = document.getElementById('trailer-iframe');
    trailerIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

    const trailerModal = document.getElementById('trailer-modal');
    trailerModal.style.display='flex';
}

function cerrarModal() {
    const trailerIframe = document.getElementById('trailer-iframe');
    trailerIframe.src = '';
    const trailerModal = document.getElementById('trailer-modal');
    trailerModal.style.display = 'none';
}

document.getElementById('btn-peliculas-2').addEventListener ('click', () => {
    mostrarPeliculas(urls.peliculas, 'Próximas Películas', 'peliculas');
})

document.getElementById('btn-series-2').addEventListener ('click', () => {
    mostrarPeliculas(urls.series, 'Próximas Series', 'series');
})

document.getElementById('btn-anime-2').addEventListener ('click', () => {
    mostrarPeliculas(urls.anime, 'Próximos Animes', 'anime');
})

mostrarPeliculas(urls.anime, 'Próximos Animes', 'anime');