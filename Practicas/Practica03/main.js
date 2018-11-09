"use strict";

const mysql = require("mysql");

const daoUser = require("./DAOUsers.js");

const _pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "tareas"
});

let user = new daoUser(_pool);
user.isUserCorrect("usuario@ucm.es", "mipass", cb_isUserCorrect);
 user.isUserCorrect("usuario@ucm.es", "mipass2", cb_isUserCorrect);

function cb_isUserCorrect(err, result) {
    if (err) {
        console.log(err.message);
    } else if (result) {
        console.log("Usuario y contraseña correctos");
    } else {
        console.log("Usuario y/o contraseña incorrectos");
    }
}

user.getUserImageName("usuario@ucm.es", cb_getUserImageName);
user.getUserImageName("usuarioucm.es", cb_getUserImageName);

function cb_getUserImageName(err, result) {
    if (err) {
        console.log(err.message);
    } else {
        console.log(result);
    }
}