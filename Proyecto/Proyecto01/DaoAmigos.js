"use strict";

//const mysql = require("mysql");

class DAOUsers {
    constructor(pool) {
        if (pool == undefined) {
            throw "Pool not defined"
        }
        this._pool = pool;
    }

    friendsList(id, callback = function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("LISTA DE AMIGOS CARGADA CON ÉXITO");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error(`Error de conexión a la base de datos`));
            } else { //busca en la tabla amigos en la columna que esté y con
                const sql = `SELECT amigo1, amigo2 FROM amigos WHERE estado='aceptada' and (amigo1=? or amigo2=?)`;
                connection.query(sql, [id, id], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        //callback(null, datos.length != 0);
                        var resultado = new Array();
                        datos.forEach(element => {
                            let amigo1 = element.amigo1;
                            if (amigo1 == id) resultado.push(element.amigo2);
                            else if (id == element.amigo2) resultado.push(element.amigo1);
                        });
                        callback(null, resultado);
                    }
                });
            }
        });

    }

    friendsRequestList(id, callback = function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("LISTA CARGADA CON ÉXITO");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error(`Error de conexión a la base de datos`));
            } else { // obtiene la lista de usuarios que han enviado solicitud de amistad a este usuario
                const sql = `SELECT amigo1 FROM amigos WHERE estado='enviada' and  amigo2=?`;
                connection.query(sql, [id], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        callback(null, datos);
                    }
                });
            }
        });
    }

    insertFriendsRequest(usuario, amigo, callback = function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("LISTA CARGADA CON ÉXITO");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error(`Error de conexión a la base de datos`));
            } else { // obtiene la lista de usuarios que han enviado solicitud de amistad a este usuario
                const sql = `INSERT INTO amigos (amigo1,amigo2,estado) VALUES (?,?,'enviada')`;
                connection.query(sql, [usuario.id, amigo], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        callback(null, datos);
                    }
                });
            }
        });
    }

    acceptFriend(usuario, amigo, callback = function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("LISTA CARGADA CON ÉXITO");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error(`Error de conexión a la base de datos`));
            } else { // obtiene la lista de usuarios que han enviado solicitud de amistad a este usuario
                const sql = `UPDATE amigos SET estado='aceptada' WHERE amigo1=? AND amigo2=?`;
                connection.query(sql, [amigo, usuario.id], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        callback(null, datos);
                    }
                });
            }
        });
    }

    rejectFriend(usuario, amigo, callback = function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("LISTA CARGADA CON ÉXITO");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error(`Error de conexión a la base de datos`));
            } else { // obtiene la lista de usuarios que han enviado solicitud de amistad a este usuario
                const sql = `DELETE FROM amigos WHERE amigo1=? AND amigo2=?`;
                connection.query(sql, [amigo, usuario.id], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        callback(null, datos);
                    }
                });
            }
        });
    }

}

module.exports = DAOUsers;