// app.js
"use strict";

const path = require("path");
const mysql = require("mysql");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs");
const cookieParser = require("cookie-parser");

// Crear un servidor Express.js
const app = express();

// Configuramos el motor de plantillas
app.set("view engine", "ejs");

// Definimos el directorio de plantillas
app.set("views", path.join(__dirname, "public", "views"));

// Usamos morgan
app.use(morgan("dev"));

// Middleware Static
const ficherosEstaticos = path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));

// Se incluye el middleware body-parser en la cadena de middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());


app.use(function (error, request, response, next) {
    // Código 500: Internal server error
    response.status(500);
    response.render("error", {
        mensaje: error.message,
        pila: error.stack
    });
});

// app.use(middlewareNotFoundError);
// app.use(middlewareServerError);

// function middlewareNotFoundError(request, response) {
//     response.status(404);
//     // envío de página 404
// }

// function middlewareServerError(error, request, response, next) {
//     response.status(500);
//     // envío de página 500
// }




app.listen(3000, function (err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " +
            err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});

// Si no existe el fichero noexiste.txt salta un error
app.get("/usuarios", function (request, response, next) {
    fs.readFile("noexiste.txt", function (err, contenido) {
        if (err) {
            next(err);
        } else {
            request.contenido = contenido;
        }
    });
});

var usuarios = ["Javier Montoro", "Dolores Vega", "Beatriz Nito"];
app.get("/users.html", function (request, response) {
    // Busca la plantilla "views/users.ejs"
    // La variable 'users' que hay dentro de esta plantilla tomará
    // el valor del array 'usuarios'.
    response.status(200);
    response.render("users", {
        users: usuarios
    });
});

app.post("/eliminarUsr", function (request, response) {

    var _id = request.body.id;

    usuarios.splice(_id, 1);
    response.redirect("/users.html");
});


app.get("/reset.html", function (request, response) {
    response.status(200);
    response.cookie("contador", 0, {
        maxAge: 86400000
    });
    response.type("text/plain");
    response.end("Has reiniciado el contador");
});

app.get("/increment.html", function (request, response) {
    if (request.cookies.contador === undefined) {
        response.redirect("/reset.html");
    } else {
        let contador = Number(request.cookies.contador) + 1;
        response.cookie("contador", contador);
        response.status(200);
        response.type("text/plain");
        response.end(`El valor actual del contador es ${contador}`);
    }
});




app.get("/primero.html", function (request, response) {
    response.status(200);
    response.render("primero", {});
});

app.get("/segundo.html", function (request, response) {
    response.status(200);
    response.cookie("contador", request.body.primero, {
        maxAge: 86400000
    });
    response.type("text/plain");
    response.render("segundo", {});
});

app.get("/resultado.html", function (request, response) {
    if (request.cookies.contador === undefined) {
        response.redirect("/reset.html");
    } else {
        let primero = Number(request.cookies.primero);
        let segundo = Number(request.cookies.primero);
        let resultado = primero + segundo;
        
        response.cookie("contador", contador);
        response.status(200);
        response.type("text/plain");
        response.end(`El valor actual del contador es ${contador}`);
    }
});