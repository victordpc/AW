"use strict";

//const mysql = require("mysql");

class DAOUsers {
    constructor(pool) {
        if (pool == undefined) {
            throw "Pool not defined"
        }
        this._pool = pool;
    }

    createUser(user, callback = function (err) {
        // createUser(Nombre, password, fechaNac, email, genero, foto, callback = function (err) {
        if (err) {
            console.log("Error creating account");
        } else {
            console.log("User created");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = `INSERT INTO usuarios  (nombre,password,fechaNac,email, genero,foto, puntos) VALUES (?,?,?,?,?,?,0)`;
                connection.query(sql, [user.nombre, user.passw, user.date, user.correo, user.genero, user.foto], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error al insertar usuario`));
                    } else {
                        callback(null, datos.insertId);
                    }
                });
            }
        });
    }
    // comprueba si en la base de datos existe un usuario cuyo identificador es email y su password coincide con password.
    isUserCorrect(email, password, callback = function (err) {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Usuario y contraseña correctos");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error(`Error de conexión a la base de datos`));
            } else { //devuelvo el id y los puntos para guardarlos en variables globales de la app
                const sql = `SELECT id,puntos FROM usuarios WHERE email = ? and password = ?`;
                connection.query(sql, [email, password], function (err, datos) {
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
                const sql = `Select foto from usuarios where email = ?`;
                connection.query(sql, [email], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        if (datos.length != 0) {
                            callback(null, datos[0].foto);
                        } else {
                            callback(null, "../img/perfil.png");
                        }
                    }
                });
            }
        });
    }

    getUserData(id, callback = function (err) {
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
                const sql = `SELECT nombre, fechaNac, genero, foto, puntos, email FROM  usuarios WHERE id = ?`;
                connection.query(sql, [id], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        if (datos.length != 0) {
                            callback(null, datos);
                        } else {
                            callback(new Error(`No existe el usuario`));
                        }
                    }
                });
            }
        });
    }

    updateUserData(usuario, callback = function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("DATOS ACTUALIZADOS CORRECTAMENTE");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error(`Error de conexión a la base de datos`));
            } else {
                const sql = `UPDATE usuarios SET Nombre = ?, fechaNac = ?, genero = ?, foto = ?, email = ? WHERE id = ?`;
              
                connection.query(sql, [usuario.nombre, usuario.fechaNac, usuario.genero, usuario.foto, uausario.email, usuario.id], function (err, datos) {
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
                const sql = `UPDATE amigos SET estado='aceptada' WHERE amigo1=? and amigo2=?`;
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