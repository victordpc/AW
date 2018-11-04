// "use strict";
// const fs = require("fs");
// try {
//     const contenido = fs.readFileSync("Entregas/Entrega12/FichTexto.txt", {
//         encoding: "utf-8"
//     });

//     console.log("Fichero leído correctamente:");
//     console.log(contenido);
// } catch (err) {
//     console.log("Se ha producido un error:");
//     console.log(err.message);
// }

// fs.readFile("Entregas/Entrega12/FichTexto.txt", {
//     encoding: "utf-8"
// }, acabadoLeer);

// // Función callback
// function acabadoLeer(err, contenido) {
//     if (err) {
//         console.log("Se ha producido un error:");
//         console.log(err.message);
//     } else {
//         console.log("Fichero leído correctamente:");
//         console.log(contenido);
//     }
// }


// // "use strict";
// // const fs = require("fs");
// let contenidoFichero;
// fs.readFile("FichTexto.txt", {
//         encoding: "utf-8"
//     },
//     function (err, contenido) {
//         if (!err) {
//             // Asignamos el contenido a la variable
//             // externa
//             contenidoFichero = contenido;
//             console.log(contenidoFichero); // ¿Qué se imprime aquí?
//         }
//     });
// console.log(contenidoFichero); // ¿Qué se imprime aquí?



// const fs = require("fs");
// const path = require("path");

// console.log(__dirname);
// console.log(__filename);


// console.log(path.parse("Entregas/Entrega12/FichTexto.txt"))


// "use strict";
// let fs = require('fs');
// for (let i = 1; i < 10; i++) {
//     let fichero = "Entregas/Entrega12/f" + i + ".txt";
//     console.log("Solicitada la escritura del fichero " + fichero);
//     fs.writeFile(fichero, fichero, function (err) {
//         if (!err) {
//             console.log("Terminada la escritura del fichero" + fichero);
//         }
//     })
// }

// "use strict";
// const fs = require("fs");
// const texto = "Actualmente el registro de nmp tiene 800.000 paquetes.";

// fs.writeFile("npm.txt", texto, {
//         encoding: "utf-8"
//     },
//     function (err) {
//         if (err) {
//             console.log("Error al escribir el fichero.");
//         } else {
//             console.log("Fichero escrito correctamente.");
//             fs.readFile("npm.txt", {
//                     encoding: "utf-8"
//                 },
//                 function (err, contenido) {
//                     if (!err) {
//                         console.log(contenido);
//                     }
//                 });
//         }
//     }
// );  


// const fs = require("fs");
// fs.readFile("HGJTF8GJ-FiMiXNf4.pdf", function (err, buffer) {
//     // Obtenemos los cuatro primeros bytes
//     const mark = buffer.slice(0, 4);
//     // Y los imprimimos con la codificación ASCII
//     console.log(mark.toString("ascii"));
// });

