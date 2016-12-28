'use strict';

app.factory('MoviesService', function () {
    var moviesList = {};
    return {
        list: moviesList,
        // Set movies to Local Storage
        setMovies: function (data) {
            if (window.localStorage && data) {

                localStorage.setItem("movies", angular.toJson(data));
                moviesList = data;
            }
        },
        // Get movies from Local Storage
        getMovies: function () {
            moviesList = angular.fromJson(localStorage.getItem("movies"));
            return moviesList ? moviesList : [];
        }
    };

});
