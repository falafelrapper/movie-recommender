// Main Script

var genreInput = $('#genreInput');
var pickForMe = $('#pickMe');
var recommendation = $('#recommendMe');
var firstPage = $('.first-page');
var recommendPage = $('.recommend-page');
var pickPage = $('.pick-page');

const apiKey = '8a85a81d0a75e85da785e682ae2cc11d'; // Replace with your TMDb API key
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
  return genreMapping[genreName] || null; // Return null if the genre is not found
}


function randomRecommend(){
  var selectedGenre = genreInput.val();

  // Make an API request to TMDb to get the top 100 most popular movies in the specified genre
  $.ajax({
      url: 'https://api.themoviedb.org/3/movie/top_rated',
      method: 'GET',
      data: {
          api_key: apiKey,
          with_genres: getGenreId(selectedGenre),
          sort_by: 'vote_average.desc',  // Sort by popularity in descending order
          page: 1  // Assuming you want the first page of results (adjust as needed)
      },
      success: function(response) {
          // Check if there are movies in the response
          if (response.results && response.results.length > 0) {
              // Randomly select 5 movies from the top 100
              var randomMovies = [];
              for (var i = 0; i < 5; i++) {
                  var randomIndex = Math.floor(Math.random() * response.results.length);
                  randomMovies.push(response.results[randomIndex]);
              }

              console.log('Randomly selected movies:', randomMovies);

              // Process the selected movies and update your UI as needed
          } else {
              console.warn('No movies found for the specified genre.');
              // Handle the case where no movies are found
          }
      },
      error: function(error) {
          console.error('Error fetching data from TMDb:', error);
          // Handle errors, update UI accordingly
      }
  });
    firstPage.addClass('hidden');

    recommendPage.removeClass('hidden');
}

// function randomPicker(){
//     firstPage.addClass('hidden');
//     pickPage.removeClass('hidden');
// }


$(recommendation).click(randomRecommend);
// $(pickForMe).click(randomPicker());