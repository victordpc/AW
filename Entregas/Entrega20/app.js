"use strict";

const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const path = require("path");

const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);

const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "tareas"
});

// Crear un servidor Express.js
const app = express();

// Usamos el midd de sesion
const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});
app.use(middlewareSession);

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

// Se incluye el validador de formularios
app.use(expressValidator());

// Middleware para mensajes flash
function flashMiddleware(request, response, next) {
    response.setFlash = function (msg) {
        request.session.flashMsg = msg;
    };
    response.locals.getAndClearFlash = function () {
        let msg = request.session.flashMsg;
        delete request.session.flashMsg;
        return msg;
    };
    next();
};
app.use(flashMiddleware);

// Arrancar el servidor
app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});

// Manejador para raiz
app.get("/", function (request, response) {
    response.status(200);
    let err=[];
    response.render("index", {
        errores: err
    });
});

app.post("/procesar_formulario", function (request, response) {
    request.checkBody("login", "Nombre de usuario vacío").notEmpty();
    request.checkBody("login", "Nombre de usuario no válido").matches(/^[A-Z0-9]+$/i);
    request.checkBody("pass", "La contraseña no es válida").isLength({
        min: 6,
        max: 10
    });
    request.checkBody("email", "Dirección de correo no válida").isEmail();
    request.checkBody("fechaNacimiento", "Fecha de nacimiento no válida").isBefore();

    request.getValidationResult().then(function (result) {
        if (result.isEmpty()) {
            response.redirect("correcto.html");
        } else {
            // Creamos el objeto de error flash
            response.setFlash(result.array());
            // Redirigimos a la raiz
            response.redirect("/");
        }
    });
});