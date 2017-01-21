var gulp = require('gulp'); //Importamos gulp
var sass = require('gulp-sass'); //Importamos Sass
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create(); //LA doc nos dice que tenemos que ejecutar create para crear una instancia de browsersinc

gulp.task("default", ["compile-sass"], function () { //Definimos la tarea a realizar cuando llamemos a gulp


    //arancar el servidor de browser sync

    browserSync.init({
       server: "./" //Le decimos que arranque el servidor en la carpeta en la que estoy ahora
    });

    //cuando haya cambios en style.scss, compila sass. El watch está atento a los cambios en el fichero que le decimos
    gulp.watch('./src/scss/style.scss',['compile-sass']);

    //cuando se cambie el html recarga el navegador
    gulp.watch('./*.html', function () { // le digo que al modificar cualquier fichero html y le paso la función como una variable
        browserSync.reload();                               //recarga el navegador
        notify().write("Navegador recargado");              // Mostramos notificación

    });

});

//compila sass
gulp.task("compile-sass", function () {         //Primero ejecuta el compile-sass
    gulp.src('./src/scss/style.scss')           //Cargo el style.scss
    .pipe(sass().on('error', function(error){   //Si ocurre un error mostramos notificación
        return notify().write(error);
    }))                                         //Compilo el sass y le asigno una interpretación de errores.
    .pipe(gulp.dest('./dist/'))                 //dejo el resultado en ./dist
    .pipe(browserSync.stream())                 //Recargamos el CSS en el navegador
    .pipe(notify("SASS Compilado"));
});