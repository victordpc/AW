// config.js
"use strict";

const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);

module.exports = {
        mysqlConfig: {
                host: "localhost", // Ordenador que ejecuta el SGBD
                user: "root", // Usuario que accede a la BD
                password: "", // Contraseña con la que se accede a la BD
                database: "phisicbook" // Nombre de la base de datos
        },
        port: 3000, // Puerto en el que escucha el servidor
        sessionStore: new MySQLStore({
                host: "localhost",
                user: "root",
                password: "",
                database: "phisicbook"
        }),
}