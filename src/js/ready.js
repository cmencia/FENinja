var $ = require('jquery');
var uiManager = require('./uiManager');


$(document).ready(function (){

    $("#new-song").on("click", function () {
        uiManager.toogleForm(); //Función que nos permitirá mostrar u ocultar el formulario
    });
});

