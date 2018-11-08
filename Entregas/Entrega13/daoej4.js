"use strict";

const mysql = require("mysql");

const _pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "awtest"
});

function leerArticulos(callback = function (err, datos) {
    _pool.end(function (err) {
        if (err) {
            console.log(`Error al cerrar el pool`);
        }
    });
    if (err) {
        console.log("ERROR EN LA OPERACION");
    } else {
        console.log("OPERACION FINALIZADA CORRECTAMENTE");
    }
}) {
    // id (númerico), titulo (cadena de texto), fecha (objeto Date) y palabrasClave (array de cadenas)
    _pool.getConnection(function (err, connection) {
        if (err) {
            callback(new Error(`Error al obtener la conexión: ${err.message}`));
        } else {
            const sqlArticulo = `Select id, titulo, fecha from  articulos`;
            connection.query(sqlArticulo, function (err, dArticulo) {

                if (err) {
                    callback(new Error(`Error de inserción: ${err}`));
                } else {

                    const sqlPClaves = 'SELECT IdArticulo, PalabraClave FROM palabrasclave ';
                    connection.query(sqlPClaves, function (err, dPalabras) {
                        connection.release();
                        if (err) {
                            callback(new Error(`Error de inserción: ${err}`));
                        } else {


                            callback(null, datos);
                        }
                    });
                }

            });
        }
    });
}


leerArticulos(function (err, filas) {
    _pool.end(function (err) {
        if (err) {
            console.log(`Error al cerrar el pool`);
        }
    });
    if (err) {
        console.log('Error en la consulta a la base de datos');
    } else {
        // Acceso a las filas resultado de la consulta
        filas.forEach(function (fila) {
            console.log(fila);
            // console.log(`${fila.id} ${fila.titulo} ${fila.fecha} ${fila.palabraClave}`);
        });
    }
});