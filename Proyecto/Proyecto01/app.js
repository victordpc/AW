"use strict";

const config = require("./config");
const daoUser = require("./DaoUsers");
const daoAmigos = require("./DaoAmigos");
const daoPreguntas = require("./DaoPreguntas");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const multer = require("multer");
var moment = require('moment');
const multerFactory = multer({
    storage: multer.memoryStorage()
}); //para que los ficheros adjuntos al formulario se almacenen en memoria
const expressValidator = require("express-validator");
// Crear un servidor Express.js 
const app = express();

// Crear un pool de conexiones a la base de datos de MySQL
const _pool = mysql.createPool(config.mysqlConfig);
let daoU = new daoUser(_pool);
let daoA = new daoAmigos(_pool);
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
        //response.locals.userEmail = request.session.currentUser
        if (request.session.id === undefined) {
            response.redirect('login.html');
        } else {
            next();
        }
    } else {
        response.redirect('login.html');
    }
}

/* Imagenes */
function ObtenerImagen(usuario, callback) {
    daoU.getUserImageName(usuario, function (err, imagen) {
        if (err) {
            console.log(err.message);
        } else {
            callback(null, imagen);
        }
    });
}

app.get("/imagen/:email", function (request, response) {
    //let usuario = request.params.email;
    // if (_id == undefined) {request.session.currentUser
    if (request.session.currentUser == undefined) {
        response.status(400);
        response.end("Petición incorrecta");
    } else {
        // ObtenerImagen(request.session.currentUser, function (err, imagen) {
        ObtenerImagen(request.params.email, function (err, imagen) {
            if (imagen) {
                response.status(200);
                response.end(imagen);
            } else {
                response.status(404);
                response.end("Not found");
            }
        });
    }
});
/* Imagenes */

/**
 * Funciones auxiliares
 */
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
/**
 * Funciones auxiliares
 */
/****************************************************************** */
/**VARIABLE GLOBALES  de plantillas********************************************/

let textoError = '';
//****************************************************************** */
/***************************Raiz*************************** */

// Manejador para raiz
app.get("/", function (request, response) {
    response.status(200);
    response.redirect("/index.html");
});

/** Principal */
app.get("/index.html", function (request, response) {
    response.status(200);
    response.render("index");
});

/**Nuevo Usuario */
app.get("/new_user.html", function (request, response) {
    response.status(200);
    response.render("new_user", {
        errores: textoError
    });
});

app.post("/newUser", multerFactory.single("foto"), function (request, response) {
    request.checkBody("email", "Dirección de correo no válida").isEmail();
    // request.checkBody("fechaNac", "Fecha de nacimiento no válida").isBefore();
    // request.checkBody("pass","La contraseña debe contener entre 4-15 caracteres").isLength({ min: 4, max: 15 });
    request.checkBody("sexo", "Este campo género no debe de estar vacío").notEmpty();
    request.getValidationResult().then(function (result) {
        // El método isEmpty() devuelve true si las comprobaciones no han detectado ningún error
        if (result.isEmpty()) {
            //let fecha =  $('#fechaNac .fechaNac').val();
            let usuario = {
                correo: request.body.email,
                passw: request.body.pass,
                nombre: request.body.nombre,
                apellidos: request.body.apellidos,
                genero: request.body.sexo,
                fechaNac: request.body.date,
                foto: null
            }
            if (request.file) {
                usuario.foto = request.file.buffer;
            }
            daoU.createUser(usuario, function (err, result) {
                if (result) {
                    response.status(200);
                    // response.redirect('login.html');

                    request.session.puntos = 0;
                    request.session.currentUser = result.insertId;
                    response.redirect('my_profile.html');
                } else {
                    textoError = ['Error del sistema intentelo de nuevo más tarde'];
                    response.status(500);
                    response.redirect("/new_user.html");
                    console.log(err);
                }
            });
        } else {
            response.status(200);
            response.render("new_user", {
                errores: result.array()
            });
        }

    });
});

//* control del login* */
app.get("/login.html", function (request, response) {
    response.status(200);
    response.render("login", {
        errorMsg: textoError
    });
});

app.post("/login", function (request, response) {
    let usuario = request.body.email;
    let password = request.body.password;

    daoU.isUserCorrect(usuario, password, function (err, data) {
        if (err) {
            console.log(err.message);
            response.status(500);
            response.redirect("500.html")
        } else if (data) {
            if (data.length != 0) {
                // Tenemos un login correcto
                // Cargamos los datos del usuario en la sesion
                daoU.getUserData(data[0].id, function (err, result) {
                    if (err) {
                        console.log(err.message);
                        response.status(500);
                        response.redirect("500.html")
                    } else {
                        let usr = {
                            email: result[0].email,
                            nombre: result[0].nombre,
                            puntos: result[0].puntos,
                        }
                        request.session.usuario = usr;
                        request.session.currentUser = result[0].id;
                        response.redirect('my_profile.html');
                    }
                });
            } else {
                textoError = 'Usuario y/o contraseña incorrectos';
                response.status(200);
                response.redirect("/login.html");
            }
        } else {
            console.log("Usuario y/o contraseña incorrectos - ?", request.body.email);
            textoError = 'Usuario y/o contraseña incorrectos';
            response.status(200);
            response.redirect("/login.html");
        }
    });
});

/**My Profile */
app.get("/my_profile.html", compruebaUsuario, function (request, response) {
    daoU.getUserData(request.session.currentUser, function (err, result) {
        if (err) {
            console.log(err.message);
            response.status(500);
            response.redirect("500.html")
        } else {
            response.status(200);
            if (result[0].fechaNac != null) {
                result[0].years = moment().diff(result[0].fechaNac, 'years', false) + ' años';
            } else {
                result[0].years = "";
            }
            app.locals.puntos = result[0].puntos;
            response.render("my_profile", {
                usuario: result,
                usr: request.session.usuario,
            });

        }
    });
});

//**Modificar */
app.get("/editProfile.html", compruebaUsuario, function (request, response) {
    daoU.getUserData(request.session.currentUser, function (err, result) {
        if (err) {
            console.log(err.message);
        } else {
            response.status(200);
            if (result[0].fechaNac != null) {
                var years = moment().diff(result[0].fechaNac, 'years', false) + ' años';
            } else {
                years = "";
            }
            result[0].dateBirth = formatDate(result[0].fechaNac);
            result[0].years = years;

            response.render("editProfile", {
                usuario: result[0],
                usr: request.session.usuario,
            });

        }
    });
});

app.post('/updateProfile', multerFactory.single("foto"), (request, response) => {
    request.checkBody("email", "Dirección de correo no válida").isEmail();
    // request.checkBody("fechaNac", "Fecha de nacimiento no válida").isBefore();
    // request.checkBody("pass","La contraseña debe contener entre 4-15 caracteres").isLength({ min: 4, max: 5 });
    request.checkBody("sexo", "Este campo género no debe de estar vacío").notEmpty();
    request.getValidationResult().then(function (result) {
        // El método isEmpty() devuelve true si las comprobaciones no han detectado ningún error
        if (result.isEmpty()) {
            //let fecha =  $('#fechaNac .fechaNac').val();
            let usuario = {
                email: request.body.email,
                nombre: request.body.nombre,
                genero: request.body.sexo,
                fechaNac: request.body.date,
                foto: null,
                id: request.session.currentUser
            }
            if (request.file) {
                usuario.foto = request.file.buffer;
            }
            daoU.updateUserData(usuario, function (err, result) {
                if (result) {
                    response.status(200);
                    response.redirect('my_profile.html');
                } else {
                    textoError = 'Error del sistema intentelo de nuevo más tarde';
                    response.status(500);
                    response.redirect('editProfile.html');
                    console.log(err);
                }
            });
        } else {
            response.status(200);
            response.render("editUser", {
                errores: result.array()
            });
        }

    });
});

/**My Profile */
app.get("/user_profile.html", compruebaUsuario, function (request, response) {
    let id = request.query.id;
    daoU.getUserData(id, function (err, result) {
        if (err) {
            console.log(err.message);
            response.status(500);
            response.redirect("500.html")
        } else {
            response.status(200);
            if (result[0].fechaNac != null) {
                result[0].years = moment().diff(result[0].fechaNac, 'years', false) + ' años';
            } else {
                result[0].years = "";
            }
            app.locals.puntos = result[0].puntos;
            response.render("user_profile", {
                usuario: result,
                usr: request.session.usuario,
            });

        }
    });
});

//************************************************************* */
//************************Amigos*****************************************
//************************************************************************

app.get("/friends.html", compruebaUsuario, function (request, response) {
    response.status(200);
    response.render("friends", {
        // amigos: _amigos,
        // solicitudes: _solicitudes
    });
    // console.log(_amigos);
    // console.log(_solicitudes);
    // console.log(request.session.amigos);
    // _amigos = []; //se limpia la lista
    // _solicitudes = [];
});

app.get("/procesarAmigos.html", function (request, response) {
    daoA.friendsList(request.session.currentUser, function (err, datosAmigos) {
        if (err) {
            response.status(404);
        } else {
            daoU.friendsRequestList(request.session.currentUser, function (err, datosSolicitudes) {
                if (err) {
                    response.status(404);
                } else {
                    response.status(200);
                    response.render("friends", {
                        amigos: datosAmigos,
                        solicitudes: datosSolicitudes
                    });
                }
            });
        }
    });
});


app.post("/searchAmigos", function (request, response) {
    //daoU.friendsRequestList(_id, function (err, result) {
    daoA.friendsRequestList(request.session.currentUser, function (err, result) {
        if (err) {
            response.status(404);
        } else {
            response.status(200);
            response.render("search", {
                personas: result
            });
        }
    });
});


app.post("/acceptFriend/:friendId", function (request, response) {
    //daoU.friendsRequestList(_id, function (err, result) {
    daoA.acceptFriend(request.session.currentUser, request.params.friendId, function (err, result) {
        if (err) {
            response.status(404);
        } else {
            response.status(200);
            response.render("search", {
                personas: result
            });
        }
    });
});

app.post("/rejectFriend/:friendId", function (request, response) {
    //daoU.friendsRequestList(_id, function (err, result) {
    daoA.rejectFriend(request.session.currentUser, request.params.friendId, function (err, result) {
        if (err) {
            response.status(404);
        } else {
            response.status(200);
            response.render("search", {
                personas: result
            });
        }
    });
});

//******************************************************************** */
//****************************LOGOUT********************** */
app.get("/desconectar", function (request, response) {
    response.status(200);
    response.redirect("/index.html");
});


/******************************************************** */
/****************PREGUNTAS ****************************** */
/******************************************************** */
app.get("/preguntas.html", compruebaUsuario, function (request, response) {
    response.status(200);
    response.render("preguntas", {
        crearPregunta: false
    });
});

app.get("/creaPregunta", function (request, response) {
    response.status(200);
    response.render("preguntas", {
        insertado: false,
        crearPregunta: true
    });
});
app.get("/insertarPregunta", function (request, response) {
    response.status(200);
    response.render("preguntas", {
        insertado: false,
        crearPregunta: true,
        errorMsg: textoError
    });
});
app.post("insertarPregunta", function (request, response) {
    daoPreguntas.createQuestion(request.body.pregunta, function (err, idPregunta) {
        if (err) {
            textoError = "No se pudo crear la pregunta, inténtalo de nuevo más tarde";
        } else {
            let listaR = document.getElementById("listaRespuestas");
            if (listaR.length > 1) {
                listaR.forEach(element => {
                    daoPreguntas.createAnswer(idPregunta, request.bodyParser, element, function (err, result) {
                        if (err) {
                            textoError = "No se pudo crear la respuesta";
                        }
                    });
                });

                response.status(200);
                response.render("preguntas", {
                    errorMsg: textoError,
                    insertado: true
                });
            } else {
                textoError = "debes introducir al menos dos respuestas";
                response.status(200);
                response.render("preguntas", {
                    errorMsg: textoError,
                    insertado: true
                });
            }
        }
    });
});