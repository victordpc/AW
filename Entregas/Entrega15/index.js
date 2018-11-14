"use strict";

const express = require("express");
const path = require('path');

const app = express();

// Configuramos el motor de plantillas
app.set("view engine", "ejs");
// Definimos el directorio de plantillas
app.set("views", path.join(__dirname, "public", "views"));


// Establecemos la cadena de middlewares
// Declaramos los middleware
app.use(function logger(request, response, next) {
    console.log(`Recibida petición ${request.method} en ${request.url} de ${request.ip}`);
    // Saltar al siguiente middleware
    next();
});
let ipsCensuradas = ["147.96.81.244", "145.2.34.23"];
app.use(function (request, response, next) {
    // Comprobar si la IP de la petición está dentro de la
    // lista de IPs censuradas.
    if (ipsCensuradas.indexOf(request.ip) >= 0) {
        // Si está censurada, se devuelve el código 401 (Unauthorized
        response.status(401);
        response.end("No autorizado"); // TERMINA LA RESPUESTA
    } else {
        // En caso contrario, se pasa el control al siguiente middlew
        console.log("IP autorizada");
        next();
    }
});

app.use(function (request, response, next) {
    request.esUCM = request.ip.startsWith("147.96.");
    next();
});

// Si usamos el middleware Static configurado con la ruta donde estan todos los ficheros estáticos,
// va a servir todo lo que se le pida que esté dentro de su arbol, sirve el css, imagenes, etc...
const ficherosEstaticos = path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));


// MEJOR USAR static
// // Servir páginas estáticas
// app.get("/", function (request, response) {
//     response.sendFile(path.join(__dirname, "public/views", "bienvenido.html"))
//     // Descarga ficheros
//     response.download(path.join(__dirname, "public/views", "bienvenido.html"))
// });


// // Siempre salta la 404
// app.use(function (request, response, next) {
//     response.status(404);
//     response.render("error", {
//         url: request.url
//     });
// });

// app.get("/index.html", function (request, response) {
//     response.status(200);
//     response.type("text/plain; encoding=utf-8");
//     response.write("¡Hola!");
//     if (request.esUCM) {
//         response.write("Estás conectado desde la UCM");
//     }
//     response.end();
// });

// // Node -> Manejador de ruta
// app.get("/", function (request, response) {
//     response.statusCode = 200;
//     response.setHeader("Content-Type", "text/html");
//     response.write("Esta es la página raíz");
//     response.end();
// });
// // Express -> Manejador de ruta
// app.get("/", function (request, response) {
//     response.status(200);
//     response.type("text/plain; charset=utf-8");
//     response.end("Esta es la página raíz");
// });

// app.get("/users.html", function (request, response) {
//     response.status(200);
//     response.type("text/plain; charset=utf-8");
//     response.end("Aquí se mostrará la página de usuarios");
// });

// Redirección para url que no tenemos pero queremos mantener
app.get("/usuarios.html", function (request, response) {
    response.redirect("/users.html");
});

app.listen(3000, function (err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " +
            err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});


// PLANTILLAS

// Usamos render para leer la plantilla "users" y pasarle los valores 
var usuarios = ["Javier Montoro", "Dolores Vega", "Beatriz Nito"];
app.get("/users.html", function (request, response) {
    response.status(200);
    response.render("users", {
        users: usuarios
    });
    // Busca la plantilla "views/users.ejs"
    // La variable 'users' que hay dentro de esta plantilla tomará
    // el valor del array 'usuarios'.
});





//parametrizamos las rutas de acceso
app.get("/usuarios/ :id ", function (request, response) {
    response.status(200);
    response.render("usuario", {
        ident: request.params.id
    });
});


app.get("/procesar_get.html", function (request, response) {
    let sexoStr = "No especificado";
    switch (request.query.sexo) {
        case "H":
            sexoStr = "Hombre";
            break;
        case "M":
            sexoStr = "Mujer";
            break;
    }
    response.render("infoForm", {
        nombre: request.query.nombre,
        edad: request.query.edad,
        sexo: sexoStr,
        fumador: (request.query.fumador === "ON" ? "Sí" : "No")
    });
});