var $ = require('jquery');
var SongsService = require('./SongsService');

$('.new-song-form').on("submit", function () {
    var self = this;

// validación rápida de inputs
    var inputs = $(this).find("input").each(function(){
        // para cada input (find("input")) del formulario (this)

        var input = this;
        if (input.checkValidity() == false) {//Input es un objeto de Jquery
            alert(input.validationMessage);
            input.focus();
            return false;
        }
    });

    // con todos los campos OK, guardamos en el backend la canción

    // creamos el objeto canción que quiero guardar con los datos dle formulario haciendo una petición ajax


    var song = { //Nos creamos un objeto song
        artist: $("#artist").val(), //Tiene el valor de campo artist .val para que nos de el valos
        title: $("#title").val(),
        audio_url: $("#audio_url").val(),
        cover_url: $("#cover_url").val()
    };

    //Ahora lo enviamos al backend con una petición ajax

    // antes de enviar el formulario, bloqueamos el botón de enviar
    $(this).find("button").text("Saving song...").attr("disabled", true);

    // lo enviamos al backend
    SongsService.save(song, function(data) { // si se guarda bien
        alert("Canción guardada correctamente");
        self.reset(); // resetea el formulario. Ponemos el 0 pq sino no accederíamos al reset del DOM (reset es una propiedad html)
        $(self).find("button").text("Save song").attr("disabled", false);
        SongsListManager.loadSongs();
    }, function(error) { // si no se guarda
        alert("Se ha producido un error");
        $(self).find("button").text("Save song").attr("disabled", false); // TODO: refactorizar esto //Activamos boton
    });

    return false; // no queremos enviar el formulario nunca

});


