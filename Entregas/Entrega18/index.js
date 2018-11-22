'use strict'

const config = require("./config");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const pool = mysql.createPool(config.mysqlConfig);
// Almacenado en memoria
const multerFactory = multer({
    storage: multer.memoryStorage()
});

// // Almacenado en directorio
// const multerFactory = multer({
//     dest: path.join(__dirname, "uploads")
// });

// Crear un servidor Express.js
const app = express();

// Configuramos el motor de plantillas
app.set("view engine", "ejs");

// Definimos el directorio de plantillas
app.set("views", path.join(__dirname, "public", "views"));

// Middleware Static
const ficherosEstaticos = path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));

// Se incluye el middleware body-parser en la cadena de middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

// Middleware para la gestión de errores
app.use(function (error, request, response, next) {
    // Código 500: Internal server error
    response.status(500);
    response.render("error", {
        mensaje: error.message,
        pila: error.stack
    });
});

// Arrancamos el servidor
app.listen(3000, function (err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " +
            err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});

// app.post("/procesar_formulario.html", multerFactory.single("foto"), function (request, response) {
//     response.render("datosFormulario", {
//         nombre: request.body.nombre,
//         apellidos: request.body.apellidos,
//         fumador: request.body.fumador === "si" ? "Sí" : "No"
//     });
// });

// app.post("/procesar_formulario.html", multerFactory.single("foto"), function (request, response) {
//     let nombreFichero = null;
//     if (request.file) {
//         nombreFichero = request.file.filename;
//     }

//     response.render("datosFormulario", {
//         nombre: request.body.nombre,
//         apellidos: request.body.apellidos,
//         fumador: request.body.fumador === "si" ? "Sí" : "No",
//         imagen: nombreFichero
//     });
// });

app.post("/procesar_formulario.html", multerFactory.single("foto"), function (request, response) {
    let usuario = {
        nombre: request.body.nombre,
        apellidos: request.body.apellidos,
        fumador: request.body.fumador === "si" ? "Sí" : "No",
        imagen: null
    };
    if (request.file) {
        usuario.imagen = request.file.buffer;
    }
    insertarUsuario(usuario, function (err, newId) {
        if (!err) {
            usuario.id = newId;
            response.render("datosformularioBD", usuario);
        }
    });
});

// // Recuperamos imagenes de carpeta
// app.get("/imagen/:id", function (request, response) {
//     let pathImg = path.join(__dirname, "uploads", request.params.id);
//     response.sendFile(pathImg);
// });

// Recuperamos imagen de BD
function insertarUsuario(usuario, callback) {
    pool.getConnection(function (err, con) {
        if (err) {
            callback(err);
        } else {
            let sql =
                "INSERT INTO personas(Nombre, Apellidos, Fumador, Foto) " +
                "VALUES (?, ?, ?, ?)";
            con.query(sql, [usuario.nombre, usuario.apellidos,
                    usuario.fumador, usuario.imagen
                ],
                function (err, result) {
                    con.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, result.insertId);
                    }
                });
        }
    });
}
// Seguimos recuperando imagen de BD
function obtenerImagen(id, callback) {
    pool.getConnection(function (err, con) {
        if (err) {
            callback(err);
        } else {
            let sql = "SELECT Foto FROM personas WHERE Id = ?";
            con.query(sql, [id], function (err, result) {
                con.release();
                if (err) {
                    callback(err);
                } else {
                    // Comprobar si existe una persona
                    // con el Id dado.
                    if (result.length === 0) {
                        callback("No existe");
                    } else {
                        callback(null, result[0].Foto);
                    }
                }
            });
        }
    });
}

function insertarUsuario(usuario, callback) {
    pool.getConnection(function (err, con) {
        if (err) {
            callback(err);
        } else {
            let sql =
                "INSERT INTO personas(Nombre, Apellidos, Fumador, Foto) " +
                "VALUES (?, ?, ?, ?)";
            con.query(sql, [usuario.nombre, usuario.apellidos,
                    usuario.fumador, usuario.imagen
                ],
                function (err, result) {
                    con.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, result.insertId);
                    }
                });
        }
    });
}