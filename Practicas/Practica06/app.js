"use strict";

const config = require("./config");
const path = require("path");
const express = require("express");

// Crear un servidor Express.js 
const app = express();

// Configuramos el motor de plantillas
app.set("view engine", "ejs");

// Definimos el directorio de plantillas
app.set("views", path.join(__dirname, "public", "views"));

// Middleware Static
const ficherosEstaticos = path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));

app.get("/", (request, response, next) => {
    response.status(200);
    response.redirect("juego");
});

app.get("/juego", (request, response, next) => {
    response.status(200);
    response.render("juego");
});

// Si nadie captura la llamada es un 404
app.use(function (request, response, next) {
    response.status(404);
    response.render("404");
});


// Arrancar el servidor
app.listen(config.port, (err) => {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});