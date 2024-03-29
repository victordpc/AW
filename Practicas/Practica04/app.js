// app.js
const config = require("./config");
const DAOTasks = require("./DAOTasks");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

// Crear un servidor Express.js
const app = express();

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia de DAOTasks
const daoT = new DAOTasks(pool);

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

// Manejador para lista de tareas
app.get("/tasks.html", function (request, response) {
    let lista = daoT.getAllTasks('usuario@ucm.es', function (err, datos) {
        if (err) {
            console.log(err);
            response.redirect("/404.html");
        } else {
            response.status(200);
            response.render("tasks", {
                taskList: datos
            });
        }
    });
});

// Manejador para añadir tarea
app.post("/addTask", function (request, response) {
    let usuario = 'usuario@ucm.es';
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
    daoT.deleteCompleted('usuario@ucm.es', function (err, datos) {
        if (err) {
            console.log(err);
            response.redirect("/404.html");
        } else {
            response.redirect("/tasks.html");
        }
    });
});