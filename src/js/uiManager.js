/**
 * Created by Carlos on 25/1/17.
 */
//Es el archivo que se va a encargar de gestionar las interfaces. Lo hemos sacado de la parte del ready.js

//Para que haciendo un require me lo meta en una variable

var $ = require('jquery'); //Como utilizo jquery he de hacer un require

module.exports = {

    uiStatus: "ui-songs-list-shown",

    toogleForm: function(){

        if (this.uiStatus =="ui-form-shown") {
           debugger;
            $("body").removeClass().addClass("ui-songs-list-shown"); //Le digo con jq que saque cualquier clase que tenga el body y que me añada la ui-form-shown para cambiar la vista
            this.uiStatus = "ui-songs-list-shown";
        }else{
            $("body").removeClass().addClass("ui-form-shown"); //Le digo con jq que saque cualquier clase que tenga el body y que me añada la ui-form-shown para cambiar la vista
            this.uiStatus = "ui-form-shown";
        }
    }
}