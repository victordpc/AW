"use strict";

const config = require("./config");
const daoTask = require("./DAOTasks");
const daoUser = require("./DAOUsers");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
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

// Crear un pool de conexiones a la base de datos de MySQL
const _pool = mysql.createPool(config.mysqlConfig);
let daoU = new daoUser(_pool);
let daoT = new daoTask(_pool);

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

// Arrancar el servidor
app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});

let textoError = '';

app.get("/login.html", function (request, response) {
    response.status(200);
    response.render("login", {
        errorMsg: textoError
    });
});

app.post("/login", function (request, response) {
    let usuario = request.body.usr;
    let password = request.body.psw;

    daoU.isUserCorrect(usuario, password, function (err, result) {
        if (err) {
            console.log(err.message);
        } else if (result) {
            request.session.currentUser = request.body.usr;
            response.redirect('tasks.html')
        } else {
            console.log("Usuario y/o contraseña incorrectos - ?", request.body.usr);
            textoError = 'Usuario y/o contraseña incorrectos';
            response.redirect('login.html')
        }
    });
});

app.get("/logout", function (request, response) {
    request.session.destroy()
    response.redirect('login.html')
});

// Manejador para lista de tareas
app.get("/tasks.html", function (request, response) {
    daoT.getAllTasks(request.session.userEmail, function (err, datos) {
        if (err) {
            console.log(err);
            response.redirect("/404.html");
        } else {
            response.status(200);
            response.render("tasks", {
                taskList: datos,
                user:request.session.userEmail
            });
        }
    });
});

// Manejador para añadir tarea
app.post("/addTask", function (request, response) {
    let usuario =request.session.currentUser;
    let texto = request.body.texto;

    daoT.insertTask(usuario, texto, function (err, params) {
        if (err) {
            console.log(err);
            response.redirect("/404.html");
        } else {
            response.redirect("/tasks.html");
        }
    });
});

// Manejador para lista de tareas
app.get("/finish/:taskId", function (request, response) {
    let id = request.params.taskId

    daoT.markTaskDone(id, function (err, datos) {
        if (err) {
            console.log(err);
            response.redirect("/404.html");
        } else {
            response.redirect("/tasks.html");
        }
    });
});

//Manejador para eliminar las tareas completadas
app.post("/eliminarCompletadas", function (request, response) {
    daoT.deleteCompleted(request.session.currentUser, function (err, datos) {
        if (err) {
            console.log(err);
            response.redirect("/404.html");
        } else {
            response.redirect("/tasks.html");
        }
    });
});