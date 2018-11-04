// Utilizando parte del código del apartado a., escribir un módulo ejnode.js que exporte la función
//  freplace(fichero, buscar, sustituir, callback) que permite buscar en fichero las cadenas que 
// describe la expresión regular buscar y sustituirlas por la cadena sustituir. 

// La función callback recibe un único parámetro que vale null si no ha ocurrido ningún error 
// y en caso contrario un objeto Error que describe el error ocurrido.
// El módulo ejnode.js tiene que estar preparado para exportar más elementos además de la función freplace.


"use strict";
const fs = require("fs");

function freeplace(fichero, buscar, sustituir, callback) {
    fs.readFile(fichero, {}, function pepe(err, contenido) {
        if (err) {
            console.log("Se ha producido un error:");
            console.log(err.message);
        } else {
            let cadena = contenido.toString();
            cadena = cadena.replace(buscar, sustituir);
            fs.writeFile(fichero, cadena, {}, callback);
        }
    });

}

// module.exports = freeplace;

module.exports = {
    free:freeplace
}