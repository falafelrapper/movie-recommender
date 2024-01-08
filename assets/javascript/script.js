// Main Script

var genreInput = $('#genreInput');
var pickForMe = $('#pickMe');
var recommendation = $('#recommendMe');
var firstPage = $('.first-page');
var recommendPage = $('.recommend-page');
var pickPage = $('.pick-page');
var refreshRecommend = $('#refresh-recommend');
var refreshPicker = $('#refresh-pick');

const apiKey = '8a85a81d0a75e85da785e682ae2cc11d';
const apiUrl = 'https://api.themoviedb.org/3/discover/movie';

var selectedMovieIds = [];

var genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western"
];

$("#genreInput").autocomplete({
  source: genres
});

var genreMapping = {
  "Action": 28,
  "Adventure": 12,
  "Animation": 16,
  "Comedy": 35,
  "Crime": 80,
  "Drama": 18,
  "Documentary": 99,
  "Family": 10751,
  "Fantasy": 14,
  "History": 36,
  "Horror": 27,
  "Music": 10402,
  "Mystery": 9648,
  "Romance": 10749,
  "Science Fiction": 878,
  "TV Movie": 10770,
  "Thriller": 53,
  "War": 10752,
  "Western": 37
};

function getGenreId(genreName) {
  return genreMapping[genreName] || null;
}


function randomRecommend() {
  var selectedGenre = genreInput.val();
  var totalPages = 50;
  var allMovies = [];

  var fetchPromises = Array.from({ length: totalPages }, (_, page) =>
    fetchMovies(selectedGenre, page + 1)
      .then(movies => allMovies.push(...movies))
  );

  Promise.all(fetchPromises)
    .then(() => {
      if (allMovies.length > 0) {
        var randomMovies = [];
        while (randomMovies.length < 5 && allMovies.length > 0) {
          var randomIndex = Math.floor(Math.random() * allMovies.length);
          var selectedMovie = allMovies.splice(randomIndex, 1)[0];
          randomMovies.push(selectedMovie);
        }

        console.log('Randomly selected movies:', randomMovies);

        displayMovies(randomMovies);

        firstPage.addClass('hidden');
        recommendPage.removeClass('hidden');
      } else {
        console.warn('No top-rated movies found.');
      }
    })
    .catch(error => console.error('Error fetching data from TMDb:', error));
}

function fetchMovies(selectedGenre, page) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://api.themoviedb.org/3/movie/top_rated',
      method: 'GET',
      data: {
        api_key: apiKey,
        sort_by: 'vote_average.desc',
        page: page,
      },
      success: function (response) {
        if (response.results && response.results.length > 0) {
          var genreId = getGenreId(selectedGenre);
          var filteredMovies = response.results.filter(movie => movie.genre_ids.includes(genreId));

          resolve(filteredMovies);
        } else {
          reject('No top-rated movies found on page ' + page + '.');
        }
      },
      error: function (error) {
        reject('Error fetching data from TMDb:', error);
      }
    });
  });
}



function randomPicker() {
  var selectedGenre = genreInput.val();
  var totalPages = 50;
  var allMovies = [];

  var fetchPromises = Array.from({ length: totalPages }, (_, page) =>
    fetchMovies(selectedGenre, page + 1)
      .then(movies => allMovies.push(...movies))
  );

  Promise.all(fetchPromises)
    .then(() => {
      if (allMovies.length > 0) {
        var randomMovies = [];
        while (randomMovies.length < 1 && allMovies.length > 0) {
          var randomIndex = Math.floor(Math.random() * allMovies.length);
          var selectedMovie = allMovies.splice(randomIndex, 1)[0];
          randomMovies.push(selectedMovie);
        }

        console.log('Randomly selected movies:', randomMovies);

        displayMovies(randomMovies);

        firstPage.addClass('hidden');
        recommendPage.removeClass('hidden');
      } else {
        console.warn('No top-rated movies found.');
      }
    })
    .catch(error => console.error('Error fetching data from TMDb:', error));
}

function fetchMoviesForPicker(selectedGenre, page) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://api.themoviedb.org/3/movie/top_rated',
      method: 'GET',
      data: {
        api_key: apiKey,
        sort_by: 'vote_average.desc',
        page: page,
      },
      success: function (response) {
        if (response.results && response.results.length > 0) {
          var genreId = getGenreId(selectedGenre);
          var filteredMovies = response.results.filter(movie => movie.genre_ids.includes(genreId));

          resolve(filteredMovies);
        } else {
          reject('No top-rated movies found on page ' + page + '.');
        }
      },
      error: function (error) {
        reject('Error fetching data from TMDb:', error);
      }
    });
  });
}

function displayMovies(movies) {
  var recommendationList = $('#recommendList');
  recommendationList.empty();

  movies.forEach(function (movie) {
    var movieCard = $('<div class="movie-card">');
    movieCard.append('<h2>' + movie.title + '</h2>');
    movieCard.append('<p>' + movie.overview + '</p>');
    movieCard.append('<img src="https://image.tmdb.org/t/p/w200/' + movie.poster_path + '" alt="' + movie.title + '">');
    movieCard.append('<button class="button add-favorite" data-movie-id="' + movie.id + '">Add to Favorites</button>');
    movieCard.append('<button class="button" type="submit">Read More</button>');

    recommendationList.append(movieCard);
  });
  previousMovies = movies;
}

function displayMoviesPick(movies, genre) {
  var pickList = $('#pick-list');
  pickList.empty();

  movies.forEach(function (movie) {
    var movieCard = $('<div class="movie-card">');
    movieCard.append('<h2>' + movie.title + '</h2>');
    movieCard.append('<p>' + movie.overview + '</p>');
    movieCard.append('<img src="https://image.tmdb.org/t/p/w200/' + movie.poster_path + '" alt="' + movie.title + '">');
    movieCard.append('<button class="button add-favorite" data-movie-id="' + movie.id + '">Add to Favorites</button>');
    movieCard.append('<button class="button" type="submit">Read More</button>');

    pickList.append(movieCard);
  });
  previousMovies = movies;
}

function addToFavorites(movieId) {
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (!favorites.includes(movieId)) {
    favorites.push(movieId);

    localStorage.setItem('favorites', JSON.stringify(favorites));

    console.log('Movie added to favorites!');
  } else {
    console.log('Movie is already in favorites!');
  }
}

function refreshRec() {
  var selectedGenre = genreInput.val();
  var totalPages = 50;
  var allMovies = [];

  var fetchPromises = Array.from({ length: totalPages }, (_, page) =>
    fetchMovies(selectedGenre, page + 1)
      .then(movies => allMovies.push(...movies))
  );

  Promise.all(fetchPromises)
    .then(() => {
      if (allMovies.length > 0) {
        var randomMovies = [];
        while (randomMovies.length < 5 && allMovies.length > 0) {
          var randomIndex = Math.floor(Math.random() * allMovies.length);
          var selectedMovie = allMovies.splice(randomIndex, 1)[0];
          randomMovies.push(selectedMovie);
        }

        console.log('Randomly selected new movies:', randomMovies);

        $('#recommendList').empty();

        displayMovies(randomMovies);
      } else {
        console.warn('No top-rated movies found.');
      }
    })
    .catch(error => console.error('Error fetching data from TMDb:', error));
}

function refreshPick() {
  var selectedGenre = genreInput.val();
  var totalPages = 50;
  var allMovies = [];

  var fetchPromises = Array.from({ length: totalPages }, (_, page) =>
    fetchMovies(selectedGenre, page + 1)
      .then(movies => allMovies.push(...movies))
  );

  Promise.all(fetchPromises)
    .then(() => {
      if (allMovies.length > 0) {
        var randomMovies = [];
        while (randomMovies.length < 1 && allMovies.length > 0) {
          var randomIndex = Math.floor(Math.random() * allMovies.length);
          var selectedMovie = allMovies.splice(randomIndex, 1)[0];
          randomMovies.push(selectedMovie);
        }

        console.log('Randomly selected new movies:', randomMovies);

        $('#recommendList').empty();

        displayMovies(randomMovies);
      } else {
        console.warn('No top-rated movies found.');
      }
    })
    .catch(error => console.error('Error fetching data from TMDb:', error));
}

$(recommendation).click(randomRecommend);
$(refreshRecommend).click(refreshRec);
$(refreshPicker).click(refreshPick);
$(pickForMe).click(randomPicker);
$(document).on('click', '.add-favorite', function() {
  var movieId = $(this).data('movie-id');

  addToFavorites(movieId);
});