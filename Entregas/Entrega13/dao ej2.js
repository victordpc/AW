"use strict";
// const fs = require("fs");
const mysql = require("mysql");


class DAO {

    constructor(host = "localhost", usr = "root", psw = "", db = "awtest") {
        this._pool = mysql.createPool({
            host: host,
            user: usr,
            password: psw,
            database: db
        });

    }

    insertarUsuario(usuario, callback = function (err) {
        if (err) {
            console.log("ERROR EN LA OPERACION");
        } else {
            console.log("OPERACION FINALIZADA CORRECTAMENTE");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error(`Error al obtener la conexión: ${err.message}`));
            } else {
                const sql = `INSERT INTO Contactos(Nombre, Correo, Telefono) VALUES (${usuario.nombre}, ${usuario.correo},${usuario.telefono})`;
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

    enviarMensaje(usuarioOrigen, usuarioDestino, mensaje, callback = function (err) {
        if (err) {
            console.log("ERROR EN LA OPERACION");
        } else {
            console.log("OPERACION FINALIZADA CORRECTAMENTE");
        }
    }) {
        //Comprobamos si los datos son válidos
        if (usuarioOrigen.hasOwnProperty(id) || (usuarioOrigen.id instanceof Number)) {
            callback(new Error(`El usuario origen del mensaje no tiene disponible un identificador.`));
        };
        if (usuarioDestino.hasOwnProperty(id) || (usuarioDestino.id instanceof Number)) {
            callback(new Error(`El usuario destino del mensaje no tiene disponible un identificador.`));
        };

        if ((mensaje instanceof String) || (usuarioDestino.id instanceof Number)) {
            callback(new Error(`El formato del campo mensaje no es correcto, debe ser una cadena de texto no vacia.`));
        };

        let hora = new Date();
        let leido = false;

        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error(`Error al obtener la conexión: ${err.message}`));
            } else {
                const sql = `INSERT INTO mensajes(idOrigen, idDestino, mensaje, hora, leido) VALUES (${usuarioOrigen.id}, ${usuarioDestino.id},${mensaje},${hora.getTime()},${leido})`;
                connection.query(sql, function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de inserción: ${err}`));
                    } else {
                        callback(null);
                    }
                });
            }
        });
    }

    bandejaEntrada(usuario, callback = function (err,datos) {
        if (err) {
            console.log("ERROR EN LA OPERACION");
        } else {
            console.log("OPERACION FINALIZADA CORRECTAMENTE");
        }
    }) {
        //Comprobamos si los datos son válidos
        if (usuarioOrigen.hasOwnProperty(id) || (usuarioOrigen.id instanceof Number)) {
            callback(new Error(`El usuario no tiene disponible un identificador.`));
        };
        
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error(`Error al obtener la conexión: ${err.message}`));
            } else {
                const sql = `Select id, idOrigen, idDestino, mensaje, hora, leido from  mensajes where leido = false and idDestino = ${usuarioDestino.id}`;
                connection.query(sql, function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de inserción: ${err}`));
                    } else {
                        callback(null,datos);
                    }
                });
            }
        });

    }

    buscarUsuario(str, callback = function (err,datos) {
        if (err) {
            console.log("ERROR EN LA OPERACION");
        } else {
            console.log("OPERACION FINALIZADA CORRECTAMENTE");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error(`Error al obtener la conexión: ${err.message}`));
            } else {
                const sql = `Select id, nombre, correo, telefono from usuarios where nombre like '%${str}%'`;
                connection.query(sql, function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de inserción: ${err}`));
                    } else {
                        callback(null,datos);
                    }
                });
            }
        });
    }

    terminarConexion(callback= function (err) {
        if (err) {
            console.log("ERROR EN LA OPERACION");
        } else {
            console.log("OPERACION FINALIZADA CORRECTAMENTE");
        }}) {
        this._pool.end(callback);
    }
}

module.exports = DAO;

// module.exports = {
//     constructor: constructor,
//     insertarUsuario: insertarUsuario,
//     enviarMensaje:enviarMensaje,
//     bandejaEntrada:bandejaEntrada,
//     buscarUsuario:buscarUsuario,
//     terminarConexion:terminarConexion,    
// }