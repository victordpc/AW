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
                var sql = ` SELECT amigo2 as id,usuarios.nombre,usuarios.apellidos,usuarios.email FROM amigos LEFT JOIN usuarios on amigos.amigo2=usuarios.id WHERE estado='aceptada' and amigo1=?`;
                sql += ` UNION ALL`;
                sql += ` SELECT amigo1 as id,usuarios.nombre,usuarios.apellidos,usuarios.email FROM amigos LEFT JOIN usuarios on amigos.amigo1=usuarios.id WHERE estado='aceptada' and amigo2=?`;
                connection.query(sql, [id, id], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        //callback(null, datos.length != 0);
                        callback(null, datos);
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
                var sql = ` SELECT amigo2 as id,usuarios.nombre,usuarios.apellidos,usuarios.email FROM amigos LEFT JOIN usuarios on amigos.amigo2=usuarios.id WHERE estado='enviada' and amigo1=?`;
                sql += ` UNION ALL`;
                sql += ` SELECT amigo1 as id,usuarios.nombre,usuarios.apellidos,usuarios.email FROM amigos LEFT JOIN usuarios on amigos.amigo1=usuarios.id WHERE estado='enviada' and amigo2=?`;

                connection.query(sql, [id,id], function (err, datos) {
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
                const sql = `UPDATE amigos SET estado='aceptada' WHERE amigo1=? AND amigo2=? OR amigo1=? AND amigo2=?`;
                connection.query(sql, [amigo, usuario,usuario,amigo], function (err, datos) {
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
                const sql = `DELETE FROM amigos WHERE amigo1=? AND amigo2=? OR amigo1=? AND amigo2=?`;
                connection.query(sql, [amigo, usuario,usuario,amigo], function (err, datos) {
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