"use strict";

const mysql = require("mysql");

class DAOPreguntas {
    constructor(pool) {
        if (pool == undefined) {
            throw "Pool not defined"
        }
        this._pool = pool;
    }

    createQuestion(texto, callback = function (err) {
        // createUser(Nombre, password, fechaNac, email, genero, foto, callback = function (err) {
        if (err) {
            console.log("Error creating question");
        } else {
            console.log("question created");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = `INSERT INTO preguntas  (texto) VALUES (?)`;
                connection.query(sql, [texto], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error al insertar pregunta`));
                    } else {
                        callback(null, datos.insertId);
                    }
                });
            }
        });
    }

    createAnswer(idPregunta, texto, callback = function (err) {
        // createUser(Nombre, password, fechaNac, email, genero, foto, callback = function (err) {
        if (err) {
            console.log("Error creating question");
        } else {
            console.log("question created");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = `INSERT INTO respuestas  (idPregunta,texto) VALUES (?,?)`;
                connection.query(sql, [idPregunta, texto], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error al insertar respuesta`));
                    } else {
                        callback(null, datos.insertId);
                    }
                });
            }
        });
    }

    getQuestionLits(callback = function (err) {
        // createUser(Nombre, password, fechaNac, email, genero, foto, callback = function (err) {
        if (err) {
            console.log("Error getting questions");
        } else {
            console.log("questions given");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = `SELECT * FROM preguntas`;
                connection.query(sql, function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error al listar preguntas`));
                    } else {

                        var listado: Array = datos;
                        for (i = 0; i < 5; i++) {
                            aleatorio = Math.floor(Math.random() * (listado.length));
                            seleccion = listado[aleatorio];
                            trace(seleccion);
                            listado.splice(aleatorio, 1);
                        }
                        callback(null,seleccion);
                    }
                });
            }
        });
    }


}

module.exports = DAOPreguntas;