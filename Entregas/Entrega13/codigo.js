// const mysql = require("mysql");


// const pool = mysql.createPool({
//     host: "localhost",
//     user: "victor",
//     password: "PswTrole$1",
//     database: "awtest"
// });


// pool.getConnection(function (err, connection) {
//     if (err) {
//         console.log(`Error al obtener la conexión: ${err.message}`);
//     } else {
//         // ... realizar consulta ...
//     }
// });

// connection.query(
//     "SELECT Nombre, Apellidos FROM Contactos",
//     function (err, filas) {
//         if (err) {
//             console.log('Error en la consulta a la base de datos';)
//         } else {
//             // Acceso a las filas resultado de la consulta
//             filas.forEach(function (fila) {
//                 console.log(`${fila.Nombre} ${fila.Apellidos}`);
//             });
//         }
//     });

const mysql = require("mysql");
// const pool = mysql.createPool({
//     host: "localhost",
//     user: 'victor',
//     password: "PswTrole$1",
//     database: "awtest"
// });

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "awtest"
});

pool.getConnection(function (err, connection) {
    if (err) {
        console.log(`Error al obtener la conexión: ${err.message}`);
    } else {
        connection.query(
            "SELECT Nombre, Apellidos FROM Contactos",
            function (err, filas) {
                connection.release(); //Libera la conexion que se usó
                if (err) {
                    console.log('Error al realizar la consulta');
                } else {
                    filas.forEach(function (fila) {
                        console.log(`${fila.Nombre} ${fila.Apellidos}`);
                    });
                }
            }
        );
    }
});

// Inserta en BBDD
pool.getConnection(function (err, connection) {
    if (err) {
        console.log(`Error al obtener la conexión: ${err.message}`);
    } else {
        const sql = "INSERT INTO Contactos(Nombre, Apellidos) VALUES ('Diana', 'Díaz')";
        connection.query(sql, function (err, resultado) {
            connection.release();
            if (err) {
                console.log("Error de inserción: " + err);
            } else {
                // Imprime el identificador de la nueva fila
                console.log(resultado.insertId);
                // Imprime el número de filas insertadas
                console.log(resultado.affectedRows);
            }
        });
    }
});

// pool.end();
let id = '1';

id = '13 or True';

pool.getConnection(function (err, connection) {
    if (err) {
        console.log(`Error al obtener la conexión: ${err.message}`);
    } else {
        const sql = `SELECT Nombre, Apellidos FROM contactos WHERE Id=${id}`;
        connection.query(sql, function (err, filas) {
            connection.release();
            if (err) {
                console.log("Error en la consulta");
            } else {
                console.log(filas);
            }
        });
    }
});


pool.getConnection(function (err, connection) {
    if (err) {
        console.log(`Error al obtener la conexión: ${err.message}`);
    } else {
        const sql = `SELECT Nombre, Apellidos FROM contactos WHERE Id=?`;
        connection.query(sql, [id], function (err, filas) {
            connection.release();
            if (err) {
                console.log("Error en la consulta");
            } else {
                console.log(filas);
            }
        });
    }
});
