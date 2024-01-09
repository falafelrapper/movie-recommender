//favorites script

//need a button on each movie to click to favorite
//use localStorage to save movies that have been favorites
//pull from localStorage to get the favorited movies
//display what was stored in localStorage
//add a clear button to clear out localStorage

var favorite = $('.localstoragelist');
var clearButton = $(".button is-link");

function getFavorites(){
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function displayFavorites(){
    var favorites = getFavorites();
    favorite.empty();

    favorites.forEach(function (movie) {
        var movieCard = $('<div class="movie-card">');
        movieCard.append('<h2>' + movie.title + '</h2>');
        movieCard.append('<p>' + movie.overview + '</p>');
        movieCard.append('<img src="https://image.tmdb.org/t/p/w200/' + movie.poster_path + '" alt="' + movie.title + '">');
        movieCard.append('<a href="https://www.themoviedb.org/movie/' + movie.id + '-' + movie.title + '" target="_blank" class="button" type="submit">Read More</a>');
        movieCard.append('<button class="button remove-favorite" data-movie-id="' + movie.id + '">Remove from Favorites</button>');
        
        favorite.append(movieCard);
      });
}

function removeFavorite(movieId){
    var favorites = getFavorites();
    var updatedFavorites = favorites.filter((movie) => movie.id !== movieId);

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    displayFavorites();
}

displayFavorites();

$(document).on('click', '.remove-favorite', function(){
    var movieId = $(this).data('movie-id');
    removeFavorite(movieId);
});

