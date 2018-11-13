"use strict";

const http = require("http");
const url = require("url");
const mysql = require("mysql");
var fs = require('fs'); // sistema de archivo
var path = require('path'); // path

// Pool de BBDD
const _pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "awtest"
});

function procesarUsuario(usuario, callback = function (err) {
    if (err) {
        console.log("ERROR EN LA OPERACION");
    } else {
        console.log("OPERACION FINALIZADA CORRECTAMENTE");
    }
}) {
    _pool.getConnection(function (err, connection) {
        if (err) {
            callback(new Error(`Error al obtener la conexión: ${err.message}`));
        } else {
            const sql = `INSERT INTO Contactos(Nombre, Correo, Telefono) VALUES ('${usuario.nombre}', '${usuario.correo}','${usuario.telefono}')`;
            connection.query(sql, function (err, resultado) {
                connection.release();
                if (err) {
                    callback(new Error(`Error de inserción: ${err}`));
                } else {
                    usuario.id = resultado.insertId;
                    callback(null);
                }
            });
        }
    });
}

const servidor = http.createServer(function (request, response) {
    const method = request.method;
    const _url = url.parse(request.url, true); // "objeto" url
    const pathname = _url.pathname; // último elemento de la cadena
    const query = _url.query; // "objeto" query.
    if (method === "GET" && pathname === "/index.html") {
        // Servir página principal.
        fs.readFile("index.html", function (bError, content) {
            if (bError) {
                response.writeHead(500);
                response.end();
            } else {
                response.writeHead(200, {
                    'content-Type': 'text/html'
                });
                response.write(content);
                response.end();
            }
        });
    } else if (method === "GET" && pathname === "/index.css") {
        // Servir página principal.
        fs.readFile("index.css", function (bError, content) {
            if (bError) {
                response.writeHead(500);
                response.end();
            } else {
                response.writeHead(200, {
                    'content-Type': 'text/css'
                });
                response.write(content);
                response.end();
            }
        });
    } else if (method === "GET" && pathname === "/nuevo_usuario") {
        // Procesar nuevo usuario.
        let objetoUrl = url.parse(request.url, true);
        let query = objetoUrl.query;
        procesarUsuario(query);
    }
    // } else if (...) {
    //     // ...
    //     // ...
    // } 
    else {
        response.statusCode = 404;
        response.end();
    }
});

// Inicio del servidor
servidor.listen(3000, function (err) {
    if (err) {
        console.log(`Error al abrir el puerto 3000: ${err}`);
    } else {
        console.log("Servidor escuchando en el puerto 3000.");
    }
});