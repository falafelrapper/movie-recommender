// Main Script

var genreInput = $('#genreInput');
var pickForMe = $('#pickMe');
var recommendation = $('#recommendMe');
var firstPage = $('.first-page');
var recommendPage = $('.recommend-page');
var pickPage = $('.pick-page');

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

function randomRecommend(){
    firstPage.addClass('hidden');

    recommendPage.removeClass('hidden');
}

// function randomPicker(){
//     firstPage.addClass('hidden');
//     pickPage.removeClass('hidden');
// }


$(recommendation).click(randomRecommend);
// $(pickForMe).on(randomPicker());