var $ = require('jquery');

$('.new-song-form').on("submit", function () {


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
});


