var $ = require('jquery');
var API_URL = "/api/songs/";




module.exports = {

    // recuperar todas las canciones
    list: function(successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "get", // get -> recuperar datos en un API REST
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("SongsServiceError", error);
            }
        })
    },

    // recuperar una canción en concreto
    // get: function(songId, successCallback, errorCallback) -> GET /api/songs/<songId>

    // borrar una canción
    delete: function(songId, successCallback, errorCallback) {
        $.ajax({
            url: API_URL + songId,
            type: "delete", // eliminar el recurso de la URL en un API REST
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("SongsServiceError", error);
            }
        });
    },

    // guardar una canción
    save: function(song, successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "post", // post -> crear un recurso en un API REST
            data: song,
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("SongsServiceError", error);
            }
        });
    }

};
