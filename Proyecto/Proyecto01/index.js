"use strict";

const config = require("./config");
const daoUser = require("./DaoUsers");
const daoPreguntas = require("./DaoPreguntas");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressValidator = require("express-validator");

// Crear un servidor Express.js 
const app = express();

// Crear un pool de conexiones a la base de datos de MySQL
const _pool = mysql.createPool(config.mysqlConfig);
let daoU = new daoUser(_pool);
let daoP = new daoPreguntas(_pool);

const sessionStore = config.sessionStore;
// Usamos el midd de sesion
const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});
app.use(middlewareSession);

// Configuramos el motor de plantillas
app.set("view engine", "ejs");

// Definimos el directorio de plantillas
app.set("views", path.join(__dirname, "public", "views"));

// Middleware Static
const ficherosEstaticos = path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));

// Se incluye el middleware body-parser en la cadena de middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

// Se incluye el validador de formularios
app.use(expressValidator());

// Middleware para mensajes flash
function flashMiddleware(request, response, next) {
    response.setFlash = function (msg) {
        request.session.flashMsg = msg;
    };
    response.locals.getAndClearFlash = function () {
        let msg = request.session.flashMsg;
        delete request.session.flashMsg;
        return msg;
    };
    next();
};
app.use(flashMiddleware);

// Arrancar el servidor
app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});


//Middleware para control de acceso
function compruebaUsuario(request, response, next) {
    if (request.session.currentUser) {
        response.locals.userEmail = request.session.currentUser
        next();
    } else {
        response.redirect('login.html');
    }
}


app.get("/", function (request, response) {
    response.status(200);
    response.render("index");
});


/**Nuevo Usuario */

app.get("/new_user.html", function (request, response) {
    response.status(200);
    response.render("new_user");
})

// let usuario = {
//      correo : request.body.email,
//      passw : request.body.pass,
//      nombre : request.body.name,
//      gender : request.body.sex,
//      fechaNac : request.body.birth,
//      fotoPerfil : null
//      puntos:0
// };
//,  multerFactory.single("imagenPerfil")
app.post("/new_user", function (request, response) {
    let correo = request.body.email;
    let passw = request.body.pass;
    let nombre = request.body.name;
    let gender = request.body.sex;
    let fechaNac = request.body.birth;
    let fotoPerfil = null;

    if (request.file) {
        fotoPerfil = request.file.buffer;
    }
    daoU.createUser(nombre, correo, passw, gender, fechaNac, fotoPerfil, function (err, result) {
        // daoU.createUser(usuario, function(err, result){
        if (err) {
            console.log(err.message);
        } else if (result) {
            request.session.currentUser = request.body.email;
            response.render('my_profile', correo);
        } else {
            console.log("Faltan datos imprescindibles");
            response.write("Hay campos obligatorios que no se han rellenado");
            response.end();
        }
    });
});

//* control del login* */
let textoError = '';
app.get("/login.html", function (request, response) {
    response.status(200);
    response.render("login", {
        errorMsg: textoError

    });
})
app.post("/login", function (request, response) {
    let usuario = request.body.email;
    let password = request.body.pass;
    daoU.isUserCorrect(usuario, password, function (err, result) {
        if (err) {
            console.log(err.message);
        } else if (result) {
            request.session.currentUser = request.body.email;
            response.redirect('my_profile.html');

        } else {
            console.log("Usuario y/o contrase�a incorrectos - ?", request.body.usr);
            textoError = 'Usuario y/o contrase�a incorrectos';
            response.redirect('login.html');
        }

        //     if (request.session.currentUser) {
        //         response.locals.userEmail = request.session.currentUser
        //         next();
        //     } else {
        //         response.redirect('login.html');
        //     }

    });
});

// function compruebaUsuario(request, response, next) {
//     if (request.session.currentUser) {
//         response.locals.userEmail = request.session.currentUser
//         next();
//     } else {
//         response.redirect('login.html');
//     }
// }
/**My Profile */

app.get("/my_profile.html", function (request, response) {
    response.status(200);
    response.render("my_profile", {
        nombre: request.query.nombre,
        sexo: request.query.sexo,
        //email: request.query.email
    });

});
app.post("/my_profile", function (request, response) {
    nombre: reque
});