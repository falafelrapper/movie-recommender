// Main Script

var genreInput = $('#genreInput');
var pickForMe = $('#pickMe');
var recommendation = $('#recommendMe');
var firstPage = $('.first-page');
var recommendPage = $('.recommend-page');
var pickPage = $('.pick-page');

const settings = {
  async: true,
  crossDomain: true,
  url: 'https://api.themoviedb.org/3/authentication',
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTg1YTgxZDBhNzVlODVkYTc4NWU2ODJhZTJjYzExZCIsInN1YiI6IjY1OTVkZDVmODY5ZTc1MGFjNDA2NTYyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y3kNEHUL4Uo-wCB8D_Dbr6OAC6jE-zzjQolpMSb-f3A'
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

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
// $(pickForMe).click(randomPicker());