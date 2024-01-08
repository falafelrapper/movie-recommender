// Main Script

var genreInput = $('#genreInput');
var pickForMe = $('#pickMe');
var recommendation = $('#recommendMe');
var firstPage = $('.first-page');
var recommendPage = $('.recommend-page');
var pickPage = $('.pick-page');

const apiKey = '8a85a81d0a75e85da785e682ae2cc11d';
const apiUrl = 'https://api.themoviedb.org/3/discover/movie';


var genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Documentary",
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

 $( "#genreInput" ).autocomplete({
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


function randomRecommend(){
  var selectedGenre = genreInput.val();

  $.ajax({
      url: 'https://api.themoviedb.org/3/movie/top_rated',
      method: 'GET',
      data: {
          api_key: apiKey,
          with_genres: getGenreId(selectedGenre),
          sort_by: 'vote_average.desc',
          page: 1 
      },
      success: function(response) {
          if (response.results && response.results.length > 0) {
              var randomMovies = [];
              for (var i = 0; i < 5; i++) {
                  var randomIndex = Math.floor(Math.random() * response.results.length);
                  randomMovies.push(response.results[randomIndex]);
              }

              console.log('Randomly selected movies:', randomMovies);

              displayMovies(randomMovies);
          } else {
              console.warn('No movies found for the specified genre.');
          }
      },
      error: function(error) {
          console.error('Error fetching data from TMDb:', error);
      }
  });
    firstPage.addClass('hidden');

    recommendPage.removeClass('hidden');
}



function randomPicker(){
  var selectedGenre = genreInput.val();
  
  $.ajax({
      url: 'https://api.themoviedb.org/3/movie/top_rated',
      method: 'GET',
      data: {
          api_key: apiKey,
          with_genres: getGenreId(selectedGenre),
          sort_by: 'vote_average.desc',
          page: 1 
        },
      success: function(response) {
        if (response.results && response.results.length > 0) {
          var randomMovies = [];
              for (var i = 0; i < 5; i++) {
                var randomIndex = Math.floor(Math.random() * response.results.length);
                  randomMovies.push(response.results[randomIndex]);
              }

              console.log('Randomly selected movies:', randomMovies);

              displayMovies(randomMovies);
            } else {
              console.warn('No movies found for the specified genre.');
            }
          },
          error: function(error) {
            console.error('Error fetching data from TMDb:', error);
          }
        });
    firstPage.addClass('hidden');
    pickPage.removeClass('hidden');
  }
  
  function displayMovies(movies){
    var recommendationList = $('#recommendList');
    recommendationList.empty();
  
    movies.forEach(function(movie) {
      var movieCard = $('<div class="movie-card">');
      movieCard.append('<h2 class="movie-title">' + movie.title + '</h2>');
      movieCard.append('<p>' + movie.overview + '</p>');
      movieCard.append('<img src="https://image.tmdb.org/t/p/w200/' + movie.poster_path + '" alt="' + movie.title + '">');
      movieCard.append('<button class="button" type="submit">Read More</button>');
  
      recommendationList.append(movieCard);
  });
  }
  
  $(recommendation).click(randomRecommend);
  $(pickForMe).click(randomPicker);