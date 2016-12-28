'use strict';

app.factory('GenresService', function () {
    var genresList = {};
    return {
        list: genresList,
        // Set genres to Local Storage
        setGenres: function (data) {
            if (window.localStorage && data) {

                localStorage.setItem("genres", angular.toJson(data));
                genresList = data;
            }
        },
        // Get genres from Local Storage
        getGenres: function () {
            genresList = angular.fromJson(localStorage.getItem("genres"));
            return genresList ? genresList : [];
        }
    };

});
