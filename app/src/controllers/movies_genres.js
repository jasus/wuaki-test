'use strict';

app.controller('MoviesGenresCtrl', function($scope, $mdDialog, $filter, GenresService, MoviesService) {


  var init = function(){

    // Default sortType Genre
    $scope.sortTypeGenre     = 'name';
    // Default sortOrder Genre
    $scope.sortReverseGenre  = false;
    // Default search/filter term Genre
    $scope.searchGenre   = '';

    // Default sortType Movie
    $scope.sortTypeMovie     = 'title';
    // Default sortOrder Movie
    $scope.sortReverseMovie  = false;
    // Default search/filter term Movie
    $scope.searchMovie   = '';

    // GET Genres from Local Storage
    $scope.genres = GenresService.getGenres();
    // GET Movies from Local Storage
    $scope.movies = MoviesService.getMovies();
  };

  // Genre dialog
  $scope.showGenreDialog = function(ev) {
    $mdDialog.show({
      controller: this,
      contentElement: '#genreDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  // Movie dialog
  $scope.showMovieDialog = function(ev) {
    $mdDialog.show({
      controller: this,
      contentElement: '#movieDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  $scope.closeDialog = function(){
    $scope.movieForm.$setUntouched();
    $scope.movieForm.$setPristine();
    $scope.genreForm.$setUntouched();
    $scope.genreForm.$setPristine();
    $mdDialog.cancel();
  }

  // DELETE Genre
  $scope.deleteGenre = function(genre){
    if(genre.numMovies > 0){
      deleteMoviesGenre(genre.name);
    }
    var index = $scope.genres.indexOf(genre);
    $scope.genres.splice(index, 1);
    GenresService.setGenres($scope.genres);
  }

  function deleteMoviesGenre(genre_name){
    var values = $filter('filter')($scope.movies, genre_name);

    for(var i=0; i < values.length; i++){
      var index = $scope.movies.indexOf(values[i]);
      $scope.movies.splice(index, 1);
    }
    MoviesService.setMovies($scope.movies);
  }

  // CREATE Genre
  $scope.createGenre = function(genre){
    genre.numMovies = 0;
    $scope.genres.push(genre);
    GenresService.setGenres($scope.genres);

    $scope.genre = {};
    $scope.genreForm.$setUntouched();
    $scope.genreForm.$setPristine();
    $mdDialog.hide();
  }

  // CREATE Movie
  $scope.createMovie = function(movie){
    movie.genre.numMovies ++;
    movie.genre = movie.genre.name;
    $scope.movies.push(movie);
    MoviesService.setMovies($scope.movies);
    GenresService.setGenres($scope.genres);

    $scope.movie = {};
    $scope.movieForm.$setUntouched();
    $scope.movieForm.$setPristine();
    $mdDialog.hide();

  }

  // DELETE Movie
  $scope.deleteMovie = function(movie){
    updateNumMoviesGenre(movie.genre);

    var index = $scope.movies.indexOf(movie);
    $scope.movies.splice(index, 1);
    MoviesService.setMovies($scope.movies);
    GenresService.setGenres($scope.genres);
  }

  function updateNumMoviesGenre(name){
    var values = $filter('filter')($scope.genres, name);
    var genre = values[0];
    genre.numMovies--;
  }

  init();

});
