//favorites script

//need a button on each movie to click to favorite
//use localStorage to save movies that have been favorites
//pull from localStorage to get the favorited movies
//display what was stored in localStorage
//add a clear button to clear out localStorage

var favorite = document.getElementById("localstoragelist");
var clearButton = document.getElementById("button-is-link");

function getFavoritedMovie(){
    var myFavorite = localStorage.getItem(favorite);
}


//clear
addEventListener()
{
    localStorage.removeItem();
}

