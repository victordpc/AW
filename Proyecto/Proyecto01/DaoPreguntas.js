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
                const sql = `INSERT INTO preguntas (texto) VALUES (?)`;
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

    createAnswer(idpregunta, respuestas, callback = function (err) {
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
                var sql = `INSERT INTO respuestas  (idPregunta,texto) VALUES `;
                var params = []
                if (Array.isArray(respuestas)) {
                    respuestas.forEach(element => {
                        sql += '(?,?),';
                        params.push(idpregunta, element);
                    });
                } else {
                    sql += '(?,?),';
                    params.push(idpregunta, respuestas);

                }
                sql = sql.slice(0, -1);

                connection.query(sql, params, function (err, datos) {

                    if (err) {
                        callback(new Error(`Error al insertar respuesta`));
                    } else {
                        const sql = `SELECT * FROM respuestas WHERE id=?`;
                        connection.query(sql, [datos.insertId], function (err, respuesta) {
                            connection.release();
                            if (err) {
                                callback(new Error(`Error al buscar la respuesta`));
                            } else {
                                callback(null, respuesta);
                            }
                        });
                    }
                });
            }
        });
    }
    getQuestion(id, callback = function (err) {
        if (err) {
            console.log("Error getting question");
        } else {
            console.log("question returned");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = `SELECT * FROM preguntas WHERE id=?`;
                connection.query(sql, [id], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error al buscar la pregunta`));
                    } else {
                        callback(null, datos);
                    }
                });
            }
        });
    }

    getAnswer(id, callback = function (err) {
        // createUser(Nombre, password, fechaNac, email, genero, foto, callback = function (err) {
        if (err) {
            console.log("Error getting answer");
        } else {
            console.log("answer returned");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = `SELECT * FROM respuestas WHERE id=?`;
                connection.query(sql, [id], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error al buscar la respuesta`));
                    } else {
                        callback(null, datos);
                    }
                });
            }
        });
    }
    getQuestionList(callback = function (err) {
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
                        callback(null, datos);
                    }
                });
            }
        });
    }

    getAnswerList(idPregunta, callback = function (err) {
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
                const sql = `SELECT * FROM respuestas WHERE idPregunta=?`;
                connection.query(sql, [idPregunta], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error al listar respuestas`));
                    } else {
                        callback(null, datos);
                    }
                });
            }
        });
    }

    addMyAnswer(ans, callback = function (err) {
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

                const sql = `INSERT INTO listarespuestas (idPregunta, idRespuesta, idUsuario) VALUES (?, ?, ?)`;
                connection.query(sql, [ans.idPregunta, ans.idRespuesta, ans.idUsuario], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error al insertar tu respuesta`));
                    } else {
                        callback(null, datos.insertId);
                    }
                });
            }
        });
    }

    getUserAnswer(idPregunta, idUsuario, callback = function (err) {
        if (err) {
            console.log("Error getting your answer");
        } else {
            console.log("question given");
        }
    }) {
        this._pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = `SELECT * FROM listarespuestas WHERE idPregunta=? and idUsuario=?`;
                connection.query(sql, [idPregunta, idUsuario], function (err, datos) {
                    connection.release();
                    if (err) {
                        callback(new Error(`Error al listar respuestas`));
                    } else {
                        callback(null, datos);
                    }
                });
            }
        });
    }
}

module.exports = DAOPreguntas;