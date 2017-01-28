var $ = require('jquery');

$('.new-song-form').on("submit"), function () {

    //Validación rápida de inputs

    var inputs = $(this).find("input").each(function (i) { //i es el índice del bucle y nos sirve para saber en que elemento estas a nivel posicional
        var input = this;
        //para cada input (find("input")) del formulario this
        if (input.checkValidity() == false){//Input es un objeto de Jquery
            alert(input.valdationMessage);
            input.focus();
            return false;
        }

    });


    return false; //no queremos que envie el form nunca



}
