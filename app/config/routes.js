'use strict';

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider

  .when('/movies_genres', {
    templateUrl: 'src/views/movies_genres.html',
    controller: 'MoviesGenresCtrl'
  })

  .otherwise({
    redirectTo: '/movies_genres'
  });

}]);
