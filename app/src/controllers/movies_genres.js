'use strict';

app.controller('MoviesGenresCtrl', function($scope, $mdDialog, $filter, GenresService, MoviesService) {

  /*
   *  INIT CONTROLLER
   */
  init();

  function init(){
    // Default values forms Genre
    $scope.sortTypeGenre     = 'name';
    $scope.sortReverseGenre  = false;
    $scope.searchGenre   = '';

    // Default values forms Movie
    $scope.sortTypeMovie     = 'title';
    $scope.sortReverseMovie  = false;
    $scope.searchMovie   = '';

    // GET Genres and Movies from Local Storage
    $scope.genres = GenresService.getGenres();
    $scope.movies = MoviesService.getMovies();
  };

  /*
   *   DIALOGS
   */

  $scope.showConfirmDeleteGenre = function(ev, genre) {
    var confirm = $mdDialog.confirm()
         .title('Would you like to delete ' + genre.name + ' genre?')
         .textContent('All movies associated with this genre will be deleted.')
         .ariaLabel('Delete genre')
         .targetEvent(ev)
         .ok('Delete')
         .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      deleteGenre(genre);
    }, function() {
      //CANCEL
    });
  };

  $scope.showConfirmDeleteMovie = function(ev, movie) {
    var confirm = $mdDialog.confirm()
         .title('Would you like to delete ' + movie.title + ' movie?')
         .textContent('')
         .ariaLabel('Delete movie')
         .targetEvent(ev)
         .ok('Delete')
         .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      deleteMovie(movie);
    }, function() {
      //CANCEL
    });
  };

  // Genre dialog
  $scope.showGenreDialog = function(ev) {
    $mdDialog.show({
      scope: $scope,
      templateUrl: 'src/views/dialogs/create_genre_dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      preserveScope: true
    });
  };

  // Movie dialog
  $scope.showMovieDialog = function(ev) {
    $mdDialog.show({
      scope: $scope,
      templateUrl: 'src/views/dialogs/create_movie_dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      preserveScope: true
    });
  };

  // Close dialogs
  $scope.closeDialog = function(){
    if($scope.movieForm){
      $scope.movieForm.$setUntouched();
      $scope.movieForm.$setPristine();
    }
    if($scope.genreForm){
      $scope.genreForm.$setUntouched();
      $scope.genreForm.$setPristine();
    }
    $mdDialog.cancel();
  }

  /*
   *    GENRE
   */

  // CREATE Genre
  $scope.createGenre = function(genre){
    genre.numMovies = 0;
    $scope.genres.push(genre);
    //Update genres of Local Storage
    GenresService.setGenres($scope.genres);

    $scope.genre = {};
    $scope.genreForm.$setUntouched();
    $scope.genreForm.$setPristine();
    $mdDialog.hide();
  }

  // DELETE Genre
  function deleteGenre(genre){
    if(genre.numMovies > 0){
      deleteMoviesGenre(genre.name);
    }

    var genreDeleted = $scope.genres.indexOf(genre);
    $scope.genres.splice(genreDeleted, 1);

    //Update genres of Local Storage
    GenresService.setGenres($scope.genres);
  }

  // DELETE Movies of Genre
  function deleteMoviesGenre(genre_name){
    var movies = $filter('filter')($scope.movies, {genre: genre_name});

    if(movies){
      for(var i=0; i < movies.length; i++){
        var movie = $scope.movies.indexOf(movies[i]);
        $scope.movies.splice(movie, 1);
      }
      MoviesService.setMovies($scope.movies);
    }
  }

  /*
   *   MOVIE
   */

  // CREATE Movie
  $scope.createMovie = function(movie){
    movie.genre.numMovies ++;
    movie.genre = movie.genre.name;
    $scope.movies.push(movie);
    //Update movies and genres of Local Storage
    MoviesService.setMovies($scope.movies);
    GenresService.setGenres($scope.genres);

    $scope.movie = {};
    $scope.movieForm.$setUntouched();
    $scope.movieForm.$setPristine();
    $mdDialog.hide();

  }

  // DELETE Movie
  function deleteMovie(movie){
    updateNumMoviesGenre(movie.genre);

    var movieDeleted = $scope.movies.indexOf(movie);
    $scope.movies.splice(movieDeleted, 1);
    MoviesService.setMovies($scope.movies);
    GenresService.setGenres($scope.genres);
  }

  // UPDATE numMovies of Genre
  function updateNumMoviesGenre(name){
    var genreFiltered = $filter('filter')($scope.genres, {name: name});
    if(genreFiltered){
      var genre = genreFiltered[0];
      genre.numMovies--;
    }
  }

});
