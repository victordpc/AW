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
                const sql = `SELECT id,text,done,tag FROM task left join tag on task.id=tag.taskId where task.user='${email}'`;
                connection.query(sql, function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {


                        callback(null, datos[0].img);
                    }
                });
            }
        });
    }
}