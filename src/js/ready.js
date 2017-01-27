var $ = require('jquery');
var uiManager = require('./uiManager');


$(document).ready(function (){

    $("#new-song").on("click", function () {
        uiManager.toggleForm(); //Función que nos permitirá mostrar u ocultar el formulario
    });
});

