// Escribir un programa ej1a.js que lea un fichero concreto y sustituya cualquier grupo de uno 
// o más espacios en blanco por un único blanco. Se deben utilizar las funciones asíncronas 
// readFile y writeFile del módulo fs.

"use strict";
const fs = require("fs");
const path = require("path");
const CarpetaGeneral = "Entregas"
const CarpetaEntrega = "Entrega12"
const Fichero = "FichTexto.txt"

const nuevoFichero = path.join(CarpetaGeneral, CarpetaEntrega, Fichero);

fs.readFile(nuevoFichero, {}, finLectura);

function finLectura(err, contenido) {
    if (err) {
        console.log("Se ha producido un error:");
        console.log(err.message);
    } else {
        let expEspacios = /[ ]+/g;
        let cadena = contenido.toString();
        cadena = cadena.replace(expEspacios, " ");
        fs.writeFile(nuevoFichero, cadena, {}, finEscritura);
    }
}

function finEscritura(err) {
    if (err) {
        console.log("Se ha producido un error al escribir el fichero");
    } else {
        console.log("Proceso finalizado correctamente");
    }
}