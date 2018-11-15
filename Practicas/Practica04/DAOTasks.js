"use strict";

const mysql = require("mysql");


class DAOTasks {
    constructor(pool) {
        if (pool == undefined) {
            throw "Pool not defined"
        }
        this._pool = pool;
    }

    // devuelve todas las tareas asociadas a un determinado usuario de la BD junto con los tags asociados a cada una de ellas.
    getAllTasks(email, callback = function (err) {
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
                const sql = `SELECT id,text,done,tag FROM task left join tag on task.id=tag.taskId where task.user = ?`;
                connection.query(sql, [email], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        let i = 0;
                        var resultado = new Array();
                        datos.forEach(element => {
                            let _id = element.id;
                            // let _text = element.text;
                            // let _done = element.done;

                            if (i == 0) {
                                var objeto = {};
                                objeto.id = _id;
                                objeto.text = element.text;
                                objeto.done = element.done;
                                objeto.tags = new Array(element.tag)

                                resultado.push(objeto)
                                i++;
                            } else {
                                let dato = resultado.filter(tarea => tarea.id == _id)
                                if (dato.length == 0) {
                                    var objeto = {};
                                    objeto.id = _id;
                                    objeto.text = element.text;
                                    objeto.done = element.done;
                                    objeto.tags = new Array(element.tag)

                                    resultado.push(objeto)
                                    i++;
                                } else {
                                    dato[0].tags.push(element.tag)
                                }
                            }
                        });
                        callback(null, resultado);
                    }
                });
            }
        });
    }

    // Inserta en la BD la tarea task asociándola al usuario cuyo  identificador es email
    insertTask(email, task, callback = function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("OPERACION FINALIZADA CORRECTAMENTE");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                console.log("Error de conexión a la base de datos: falla la solicitud de conexión al pool.");
            } else {
                const sql = `INSERT INTO task ( user , text, done) VALUES (?, ?, 0)`;
                connection.query(sql, [email, task], function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    } else {

                        callback(null, resultado);
                    }
                });
            }
        });

    }

    // Marca la tarea idTask como realizada actualizando en la base de datos la columna done a true. 
    markTaskDone(idTask, callback = function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("OPERACION FINALIZADA CORRECTAMENTE");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                console.log("Error de conexión a la base de datos");
            } else {
                const sql = `UPDATE task SET done = 1 WHERE id = ?`;
                connection.query(sql, [idTask], function (err, resultado) {
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    } else {
                        callback(null, resultado);
                    }
                })
            }
        });
    }


    // Elimina todas las tareas asociadas al usuario cuyo correo es email y que tengan el valor true en la columna done. 
    deleteCompleted(email, callback = function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("OPERACION FINALIZADA CORRECTAMENTE");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) console.log("Error");
            else {
                const sql = `DELETE FROM task WHERE user = ? and done = 1`;
                connection.query(sql, [email], function (err, resultado) {
                    if (err) console.log("error en la BBDD al intentar eliminar la tarea");
                    else {
                        callback(null, resultado);
                    }
                });
            }
        });
    }
}
module.exports = DAOTasks;