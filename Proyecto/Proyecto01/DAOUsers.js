"use strict";

const mysql = require("mysql");

class DAOUsers {
    constructor(pool) {
        if (pool == undefined) {
            throw "Pool not defined"
        }
        this._pool = pool;
    }

    // comprueba si en la base de datos existe un usuario cuyo identificador es email y su password coincide con password.
    isUserCorrect(email, password, callback = function (err) {
        if (err) {
            console.log(err.message);
        } else if (result) {
            console.log("Usuario y contraseña correctos");
        } else {
            console.log("Usuario y/o contraseña incorrectos");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error(`Error de conexión a la base de datos`));
            } else {
                const sql = `Select 1 from  user where email = ? and password = ?`;
                connection.query(sql, [email, password], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        callback(null, datos.length != 0);
                    }
                });
            }
        });
    }

    // obtiene el nombre de fichero que contiene la imagen de perfil de un usuario cuyo identificador en la base de datos es email.
    getUserImageName(email, callback = function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("OPERACION FINALIZADA CORRECTAMENTE");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error(`Error de conexión a la base de datos`));
            } else {
                const sql = `Select img from  user where email = ?`;
                connection.query(sql, [email], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        if (datos.length != 0) {
                            callback(null, datos[0].img);
                        } else {
                            callback(new Error(`No existe el usuario`));
                        }
                    }
                });
            }
        });
    }
}

module.exports = DAOUsers;