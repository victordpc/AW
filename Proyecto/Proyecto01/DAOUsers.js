"use strict";

//const mysql = require("mysql");

class DaoUsers {
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
                const sql = `INSERT INTO usuarios  (nombre,apellidos,password,fechaNac,email, genero,foto, puntos) VALUES (?,?,?,?,?,?,?,0)`;
                connection.query(sql, [user.nombre, user.apellidos, user.passw, user.fechaNac, user.correo, user.genero, user.foto], function (err, datos) {
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
                const sql = `SELECT id,puntos FROM usuarios WHERE upper(email) = upper(?) and password = ?`;
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
                    if (err) {
                        connection.release();
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        if (datos.length != 0 && datos[0].foto) {
                            connection.release();
                            callback(null, datos[0].foto);
                        } else {
                            const sql2 = `Select foto from usuarios where email = ?`;
                            connection.query(sql2, [`nadie`], function (err, datos) {
                                connection.release();
                                if (err) {
                                    callback(new Error(`Error de acceso a la base de datos`));
                                } else {
                                    if (datos.length != 0 && datos[0].foto) {
                                        callback(null, datos[0].foto);
                                    } else {
                                        callback(null, "../img/perfil.png");
                                    }
                                }
                            });
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
                const sql = `SELECT id, nombre, fechaNac, genero, puntos, email, apellidos FROM usuarios WHERE id = ?`;
                connection.query(sql, [id], function (err, datos) {
                    if (err) {
                        connection.release();
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        if (datos.length != 0) {

                            //Cogemos las fotos que ha subido el usuario
                            // SELECT fotografias.id FROM fotografias left join usuarios on usuarios.id=fotografias.idUsuario WHERE usuarios.email='vic@tor.com'
                            const sql2 = `SELECT fotografias.id FROM fotografias WHERE fotografias.idUsuario= ?`;
                            connection.query(sql2, [id], function (err, datos2) {
                                connection.release();
                                if (err) {
                                    callback(new Error(`Error de acceso a la base de datos`));
                                } else {
                                    datos[0].imagenes = datos2;
                                    callback(null, datos);
                                }
                            });
                        } else {
                            connection.release();
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
                var sql = `UPDATE usuarios SET `;
                var datos = [];

                sql += `nombre = ?, apellidos=?,fechaNac = ?, genero = ?, email = ?`;
                datos = [usuario.nombre, usuario.apellidos, usuario.fechaNac, usuario.genero, usuario.email];

                if (usuario.foto !== null) {
                    sql += `, foto = ?`;
                    datos.push(usuario.foto);
                }

                sql += ` WHERE id = ?`;
                datos.push(usuario.id);

                connection.query(sql, datos, function (err, datos) {
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

    uploadFoto(foto, callback = function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("OPERACION FINALIZADA CORRECTAMENTE");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = `INSERT INTO fotografias (idUsuario, comentario, foto) VALUES (?,?,?)`;
                connection.query(sql, [foto.id, foto.descripcion, foto.foto], function (err, datos) {
                    if (err) {
                        connection.release();
                        callback(new Error(`Error al insertar usuario`));
                    } else {
                        const sql2 = `UPDATE usuarios set puntos=puntos-100 where id=?`;
                        connection.query(sql2, [foto.id], function (err) {
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
        });
    }

    // obtiene el nombre de fichero que contiene la imagen de perfil de un usuario cuyo identificador en la base de datos es email.
    getUploadedPhoto(email, callback = function (err) {
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
                const sql = `Select foto from fotografias where id = ?`;
                connection.query(sql, [email], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        callback(null, datos[0].foto);
                    }
                });
            }
        });
    }

}

module.exports = DaoUsers;