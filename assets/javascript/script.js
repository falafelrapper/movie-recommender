// Main Script

var genreInput = $('#genreInput');

var genres = [
      "Action",
      "Horror",
      "Comedy",
      "Drama",
      "Crime",
      "Thriller",
      "Romance",
      "Arthouse",
      "Biopic",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
];
 $( "#genreInput" ).autocomplete({
   source: genres
  });
