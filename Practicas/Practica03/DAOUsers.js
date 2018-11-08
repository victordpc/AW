"use strict";

const mysql = require("mysql");

class DAOUsers {
    constructor(pool) {
        if (pool == undefined) {
            throw "Pool not defined"
        }
        this._pool = pool;
    }

    isUserCorrect(email, password, callback = function (err) {
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
                const sql = `Select 1 from  user where email = '${email}' and password = '${password}'`;
                connection.query(sql, function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error de acceso a la base de datos`));
                    } else {
                        callback(null,datos.length!=0);
                    }
                });
            }
        });
    }

    getUserImageName(email, callback= function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("OPERACION FINALIZADA CORRECTAMENTE");
        }}) {
            this._pool.getConnection(function (err, connection) {
                if (err) {
                    callback(new Error(`Error de conexión a la base de datos`));
                } else {
                    const sql = `Select img from  user where email = '${email}'`;
                    connection.query(sql, function (err, datos) {
                        connection.release();
                        if (err) {
                            callback(new Error(`Error de acceso a la base de datos`));
                        } else {
                            if (datos.length!=0) {
                                callback(null,datos[0].img);
                            }else{
                            callback(new Error(`No existe el usuario`));
                            }
                        }
                    });
                }
            });
        }
}

module.exports=DAOUsers;