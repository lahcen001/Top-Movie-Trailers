const button = document.querySelector('#search');
const input = document.querySelector('#inputValue');
const movies_searchable = document.querySelector('#movies-searchable');
const movies_container = document.querySelector('#movies-container');
const API_KEY = '2e5b955e5aae727f1c159882a93239af';
const image_url = 'https://image.tmdb.org/t/p/w500/';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=2e5b955e5aae727f1c159882a93239af&query=';


function generateURL(path) {

    const url = `https://api.themoviedb.org/3${path}?api_key=2e5b955e5aae727f1c159882a93239af&query=`;
    return url;

}

function requestMovies(url, onComplete, onError) {

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            createVideoTemplate(data, content);

        })
        .catch((error) => {
            console.log('Error :', error);
        });

}




function movieSection(movies) {

    return movies.map((movie) => {

            if (movie.poster_path) {
                return `


          <img src=${image_url+movie.poster_path} data-movie-id=${movie. id} />  
            `;

            }
        }

    )
    i

}

function createMovieContainer(movies, title = '') {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');
    movieTemplate = `
    <h2>${title}</h2>
    <section class="section">
 ${movieSection(movies)}

</section> 

<div class="content ">
<p id="content-close">X</p>
</div>
`;


    movieElement.innerHTML = movieTemplate;
    return movieElement;

}


function renderSearchMovies(data) {

    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movies_searchable.innerHTML = '';
    movies_searchable.appendChild(movieBlock);
    console.log('Data', movieBlock);


}




function renderMovies(data) {


    const title = this.title;
    const movies = data.results;
    const movieBlock = createMovieContainer(movies, this.title);
    movies_container.appendChild(movieBlock);



}


function createIframe(video) {

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.alloFullscreen = true;
    return iframe;


}



function createVideoTemplate(data, content) {


    content.innerHTML = '<p id="content-close"></p>'

    const videos = data.results;
    const lenght = videos.length > 4 ? 4 : videos.length;
    const iframeContainer = document.createElement('div');
    for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);

    }

}

function requestMovies(url, onComplete, onError) {

    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError)


}

////////////////////////////////////////////////////////////
function searchMovie(value) {
    const path = '/search/movie';
    const url = generateURL(path) + value;
    requestMovies(url, renderSearchMovies, handleError);
}

function upcoming() {
    const render = renderMovies.bind({ title: 'Upcoming Movies' });
    const path = '/movie/upcoming';
    const url = generateURL(path);
    requestMovies(url, render, handleError);
}

function toprated() {
    const render = renderMovies.bind({ title: 'Top Rated Movies' });
    const path = '/movie/top_rated';
    const url = generateURL(path);
    requestMovies(url, render, handleError);
}

function popularMovie() {
    const render = renderMovies.bind({ title: 'Popular Movies' });
    const path = '/movie/popular';
    const url = generateURL(path);
    requestMovies(url, render, handleError);
}
upcoming();
toprated();
popularMovie();
////////////////////////////////////////////////////////////

function handleError() {
    console.log('Error');
}



button.onclick = function(event) {
    event.preventDefault();
    const value = input.value;
    searchMovie(value);
    input.value = '';
}

document.onclick = function(event) {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
        console.log('hello world');

        const movieID = target.dataset.movieId;

        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');

        const path = `/movie/${movieID }/videos`;
        const url = generateURL(path);

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                createVideoTemplate(data, content);

            })
            .catch((error) => {
                console.log('Error :', error);
            });
    }


    if (target.id === 'content-close') {

        const content = target.parentElement;
        content.classList.remove('content-display');


    }
}