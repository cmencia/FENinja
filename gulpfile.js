var gulp = require('gulp'); //Importamos gulp
var sass = require('gulp-sass'); //Importamos Sass
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create(); //LA doc nos dice que tenemos que ejecutar create para crear una instancia de browsersinc
var concat = require('gulp-concat');
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps'); //Ahora me dirá donde esta el código en el archivo origanl scss, no en el css


//Config - Hemos visto que muchas url se repiten, vamos crearnos variables.

//Nos creamos un objeto en el ponemos toda la configuración de las rutas para evitar que nos equivoquemos al ponerla en el código. Si hemos de cambiar algo lo hacemos aquí y ya

var sassConfig = {
    compileSassTaskName: 'compile-sass',
    watchFiles: './src/scss/*.scss',
    entryPoint: './src/scss/style.scss',
    dest: './dist'
};

var jsConfig = {
    concatJsTaskName: 'concat-js',
    watchFiles: './src/js/*.js',
    entryPoint: './src/js/main.js',
    concatFile: 'main.js',
    dest: './dist/'
};


gulp.task("default", [sassConfig.compileSassTaskName, jsConfig.concatJsTaskName], function () { //Definimos la tarea a realizar cuando llamemos a gulp


    //arancar el servidor de browser sync

    browserSync.init({
       server: "./" //Le decimos que arranque el servidor en la carpeta en la que estoy ahora
    });

    //cuando haya cambios en style.scss, compila sass. El watch está atento a los cambios en el fichero que le decimos
    gulp.watch(sassConfig.watchFiles,[sassConfig.compileSassTaskName]);//Observa cambios en cualquier scss

    //Cuando haya cambios en archivos .js me los concatena

    gulp.watch(jsConfig.watchFiles, [jsConfig.concatJsTaskName]);


    //cuando se cambie el html recarga el navegador
    gulp.watch('./*.html', function () { // le digo que al modificar cualquier fichero html y le paso la función como una variable
        browserSync.reload();                               //recarga el navegador
        notify().write("Navegador recargado");              // Mostramos notificación

    });
});

//compila sass
gulp.task(sassConfig.compileSassTaskName, function () {         //Primero ejecuta el compile-sass
    gulp.src(sassConfig.entryPoint)           //Cargo el style.scss
    .pipe(sourcemaps.init())                  //Lo ponemos aquí pq es donde empezamos a procesar los archivos y así podemos capturar los source maps
    .pipe(sass().on('error', function(error){   //Si ocurre un error mostramos notificación
        return notify().write(error);
    }))                                         //Compilo el sass y le asigno una interpretación de errores.
    .pipe(sourcemaps.write('./'))                                 //Hemos terminado de procesar los archgivos y ponemos la carpeta donde queremos que se generen los source maps (en la misma carperta
    .pipe(gulp.dest(sassConfig.dest))                 //dejo el resultado en ./dist
    .pipe(browserSync.stream())                 //Recargamos el CSS en el navegador
    .pipe(notify("SASS Compilado"));
});


// concatena js

gulp.task(jsConfig.concatJsTaskName, function(){
    gulp.src(jsConfig.entryPoint)
        .pipe(tap(function(file){ // para cada archivo seleccionado
            // lo pasamos por browserify para importar los require
            file.contents = browserify(file.path, { debug:true }).bundle().on('error', function(error){
                return notify().write(error); // si ocurre un error javascript, lanza notificación
            });
        }))
        .pipe(buffer()) // convertimos a buffer para que funcione el siguiente pipe
        // .pipe(concat(jsConfig.concatFile))
        .pipe(sourcemaps.init({ loadMaps: true}))  //Lo ponemos aquí pq es donde empezamos a procesar los archivos y así podemos capturar los source maps
        .pipe(sourcemaps.write('./'))   // terminamos de capturar los sourcemaps
        .pipe(gulp.dest(jsConfig.dest))
        .pipe(notify("JS Concatenado 💪"))
        .pipe(browserSync.stream());
});



















