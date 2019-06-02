"use strict";

const {
    formatDate
} = require("./formatDate");

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
    response.setFlash = (msg) => {
        request.session.flashMsg = msg;
    };
    response.locals.getAndClearFlash = () => {
        let msg = request.session.flashMsg;
        delete request.session.flashMsg;
        return msg;
    };
    next();
};
app.use(flashMiddleware);

//Middleware para control de acceso
function compruebaUsuario(request, response, next) {
    if (request.session.currentUser) {
        //response.locals.userEmail = request.session.currentUser
        if (request.session.id === undefined) {
            response.redirect('login');
        } else {
            next();
        }
    } else {
        response.redirect('login');
    }
}

/* Imagenes */
function ObtenerImagen(usuario, callback) {
    daoU.getUserImageName(usuario, (err, imagen) => {
        if (err) {
            console.log(err.message);
        } else {
            callback(null, imagen);
        }
    });
}

app.get("/imagen/:email", (request, response, next) => {
    if (request.session.currentUser == undefined) {
        response.status(400);
        response.end("Petición incorrecta");
    } else {
        ObtenerImagen(request.params.email, (err, imagen) => {
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

app.get("/imagen2/:email", (request, response, next) => {
    if (request.session.currentUser == undefined) {
        response.status(400);
        response.end("Petición incorrecta");
    } else {
        ObtenerImagen(request.params.email, (err, imagen) => {
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

//******************************************************* */
//***************************Raiz************************ */
// Manejador para raiz
app.get("/", (request, response, next) => {
    response.status(200);
    response.redirect("index");
});

/** Principal */
app.get("/index", (request, response, next) => {
    response.status(200);
    response.render("index");
});

/**Nuevo Usuario */
app.get("/new_user", (request, response, next) => {
    response.status(200);
    let err = [];
    response.render("new_user", {
        errores: err
    });
});

app.post("/newUser", multerFactory.single("foto"), (request, response, next) => {
    request.checkBody("email", "Dirección de correo no válida").isEmail();
    // request.checkBody("fechaNac", "Fecha de nacimiento no válida").isBefore();
    request.checkBody("pass", "La contraseña debe contener entre 4-15 caracteres").isLength({
        min: 4,
        max: 15
    });
    request.checkBody("sexo", "Este campo género no debe de estar vacío").notEmpty();
    request.getValidationResult().then((result) => {
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
            daoU.createUser(usuario, (err, result) => {
                if (!err) {
                    cargarUsuarioRedirigePerfil(result, next, request, response);
                } else {
                    response.setFlash([{
                        msg: 'Error del sistema intentelo de nuevo más tarde'
                    }]);
                    response.redirect("/new_user");
                    console.log(err);
                }
            });
        } else {
            response.status(200);
            response.setFlash(result.array());
            response.redirect("/new_user");
        }
    });
});

//* control del login* */
app.get("/login", (request, response, next) => {
    response.status(200);
    let err = [];
    response.render("login", {
        errorMsg: err
    });
});

app.post("/login", (request, response, next) => {
    let usuario = request.body.email;
    let password = request.body.password;

    daoU.isUserCorrect(usuario, password, (err, data) => {
        if (err) {
            next(err);
        } else if (data) {
            if (data.length != 0) {
                // Tenemos un login correcto
                // Cargamos los datos del usuario en la sesion
                daoU.getUserData(data[0].id, (err, result) => {
                    if (err) {
                        next(err);
                    } else {
                        let usr = {
                            email: result[0].email,
                            nombre: result[0].nombre,
                            puntos: result[0].puntos,
                        }
                        request.session.usuario = usr;
                        request.session.currentUser = result[0].id;
                        response.redirect('my_profile');
                    }
                });
            } else {
                response.setFlash([{
                    msg: 'Usuario y/o contraseña incorrectos'
                }]);
                response.status(200);
                response.redirect("/login");
            }
        } else {
            console.log("Usuario y/o contraseña incorrectos - ?", request.body.email);
            response.setFlash([{
                msg: 'Usuario y/o contraseña incorrectos'
            }]);
            response.status(200);
            response.redirect("/login");
        }
    });
});

/**My Profile */
app.get("/my_profile", compruebaUsuario, (request, response, next) => {
    daoU.getUserData(request.session.currentUser, (err, result) => {
        if (err) {
            next(err);
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
app.get("/editProfile", compruebaUsuario, (request, response, next) => {
    daoU.getUserData(request.session.currentUser, (err, result) => {
        if (err) {
            next(err);
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

app.post('/updateProfile', multerFactory.single("foto"), (request, response, next) => {
    request.checkBody("email", "Dirección de correo no válida").isEmail();
    // request.checkBody("fechaNac", "Fecha de nacimiento no válida").isBefore();
    // request.checkBody("pass","La contraseña debe contener entre 4-15 caracteres").isLength({ min: 4, max: 5 });
    request.checkBody("sexo", "Este campo género no debe de estar vacío").notEmpty();
    request.getValidationResult().then((result) => {
        // El método isEmpty() devuelve true si las comprobaciones no han detectado ningún error
        if (result.isEmpty()) {
            //let fecha =  $('#fechaNac .fechaNac').val();
            let usuario = {
                email: request.body.email,
                apellidos: request.body.apellidos,
                nombre: request.body.nombre,
                genero: request.body.sexo,
                fechaNac: request.body.date,
                foto: null,
                id: request.session.currentUser
            }
            if (request.file) {
                usuario.foto = request.file.buffer;
            }
            daoU.updateUserData(usuario, (err, result) => {
                if (result) {
                    response.status(200);
                    response.redirect('my_profile');
                } else {
                    response.setFlash([{
                        msg: 'Error del sistema intentelo de nuevo más tarde'
                    }]);
                    response.status(500);
                    response.redirect('editProfile');
                }
            });
        } else {
            response.status(200);
            response.setFlash(result.array());
            response.redirect('editProfile');
        }
    });
});

app.post('/uploadPhoto', multerFactory.single("foto"), (request, response, next) => {
    request.checkBody("descripcion", "Debe incluir una descripción").notEmpty();

    request.getValidationResult().then((result) => {
        // El método isEmpty() devuelve true si las comprobaciones no han detectado ningún error
        if (result.isEmpty() && request.file) {
            let upFoto = {
                id: request.session.currentUser,
                descripcion: request.body.descripcion,
                foto: request.file.buffer
            }

            daoU.uploadFoto(upFoto, (err, result) => {
                if (result) {
                    response.status(200);
                    response.redirect('my_profile');
                } else {
                    response.setFlash([{
                        msg: 'Error del sistema intentelo de nuevo más tarde'
                    }]);
                    response.status(500);
                    response.redirect('my_profile');
                }
            });
        } else {
            var errores = [];
            if (result.array().length > 0) {
                for (let index = 0; index < result.array().length; index++) {
                    errores.push(result.array()[index]);
                }
            }
            if (!request.file) {
                errores.push({
                    msg: 'Debe adjuntar una fotografía.'
                });
            }
            response.status(200);
            response.setFlash(errores);
            response.redirect('my_profile');
        }
    });
});

/**My Profile */
app.get("/user_profile", compruebaUsuario, (request, response, next) => {
    let id = request.query.id;
    daoU.getUserData(id, (err, result) => {
        if (err) {
            next(err);
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

//******************************************************* */
//************************Amigos************************* */
//******************************************************* */

app.get("/friends", compruebaUsuario, (request, response, next) => {
    daoA.friendsList(request.session.currentUser, (err, datosAmigos) => {
        if (err) {
            next(err);
        } else {
            daoA.friendsRequestList(request.session.currentUser, (err, datosSolicitudes, datosSolicitudEnviada) => {
                if (err) {
                    next(err);
                } else {
                    response.status(200);
                    response.render("friends", {
                        amigos: datosAmigos,
                        solicitudes: datosSolicitudes,
                        solHechas: datosSolicitudEnviada,
                        usr: request.session.usuario,
                    });
                }
            });
        }
    });
});

app.post("/searchAmigos", (request, response, next) => {
    daoA.friendsSearch(request.body.nombre, request.session.currentUser, (err, result) => {
        if (err) {
            next(err);
        } else {
            response.status(200);
            response.render("search", {
                personas: result,
                usr: request.session.usuario,
                busqueda: request.body.nombre,
            });
        }
    });
});

app.get("/makeFriends", (request, response, next) => {
    let id = request.query.id;
    daoA.insertFriendsRequest(request.session.currentUser, id, (err, result) => {
        if (err) {
            next(err);
        } else {
            response.status(200);
            response.redirect("friends");
        }
    });
});

app.get("/acceptFriend", (request, response, next) => {
    let id = request.query.id;
    daoA.acceptFriend(request.session.currentUser, id, (err, result) => {
        if (err) {
            next(err);
        } else {
            response.status(200);
            response.redirect("friends");
        }
    });
});

app.get("/rejectFriend", (request, response, next) => {
    let id = request.query.id;
    daoA.rejectFriend(request.session.currentUser, id, (err, result) => {
        if (err) {
            next(err);
        } else {
            response.status(200);
            response.redirect("friends");
        }
    });
});

//******************************************************* */
//****************************LOGOUT********************* */
app.get("/desconectar", (request, response, next) => {
    response.status(200);
    response.redirect("/index");
});

/******************************************************** */
/****************PREGUNTAS ****************************** */
/******************************************************** */
app.get("/preguntas", compruebaUsuario, (request, response, next) => {
    daoP.getQuestionList(request.session.currentUser, (err, preguntas) => {
        if (err) {
            next(err);
        } else {
            daoP.getGuessList(request.session.currentUser, (err, listaAdivinados) => {
                if (err) {
                    next(err);
                } else {
                    var preguntasEscogidas = ObtenerPreguntasAleatorias(preguntas);
                    response.status(200);
                    response.render("preguntas", {
                        respuestas: [],
                        amigosQueHanContestado: [],
                        AmigosAdivinados: listaAdivinados,
                        sePuedeCrearPregunta: true,
                        preguntas: preguntasEscogidas,
                        pregunta: '',
                        creandoPregunta: false,
                        usr: request.session.usuario,
                    });
                }
            });
        }
    });
});

app.get("/procesarPregunta", compruebaUsuario, (request, response, next) => {
    let id = request.query.id;
    daoP.getQuestion(id, request.session.currentUser, (err, pregunta) => {
        if (!err) {
            daoP.getAnswerList(id, (err, respuestas) => {
                if (!err) {
                    daoP.getGuessList(request.session.currentUser, (err, listaAdivinados) => {
                        if (err) {
                            next(err);
                        } else {
                            response.status(200);
                            response.render("preguntas", {
                                respuestas: respuestas,
                                amigosQueHanContestado: [],
                                AmigosAdivinados: listaAdivinados,
                                sePuedeCrearPregunta: false,
                                preguntas: [],
                                pregunta: pregunta[0],
                                creandoPregunta: false,
                                usr: request.session.usuario,
                            });
                        }
                    });
                }
            });
        }
    });
});

app.post("/responder", (request, response, next) => {
    if (request.body.respuesta != Number) {
        daoP.createAnswer(request.body.idPregunta, request.body.respuesta, (err, respuesta) => {
            if (!err) {
                let resp = {
                    idPregunta: respuesta[0].idPregunta,
                    idRespuesta: respuesta[0].id,
                    idUsuario: request.session.currentUser
                }
                daoP.addMyAnswer(resp, (err, result) => {
                    if (!err) {
                        response.status(200);
                        response.redirect("/preguntas");
                    } else {
                        next(err);
                    }
                });
            } else {
                next(err);
            }
        });
    } else {
        let resp = {
            idPregunta: request.body.idPregunta,
            idRespuesta: request.body.respuesta,
            idUsuario: request.session.currentUser
        }
        daoP.addMyAnswer(resp, (err, result) => {
            if (!err) {
                response.status(200);
                response.redirect("/preguntas");
            } else {
                next(err);
            }
        });
    }
});

app.get("/creaPregunta", (request, response, next) => {
    response.status(200);
    response.render("preguntas", {
        preguntas: [],
        respuestas: [],
        sePuedeCrearPregunta: false,
        creandoPregunta: true,
        pregunta: '',
        AmigosAdivinados:[],
        amigosQueHanContestado:[],
        usr: request.session.usuario,
    });
});

app.post("/insertarPregunta", (request, response, next) => {
    if (request.body.respuesta != undefined && request.body.respuesta.length >= 2) {
        daoP.createQuestion(request.body.preguntaText, (err, idPregunta) => {
            if (!err) {
                if (request.body.respuesta != undefined) {
                    daoP.createAnswer(idPregunta, request.body.respuesta, (err, result) => {
                        if (err) {
                            next(err);
                        } else {
                            response.redirect("/preguntas");
                        }
                    });
                } else {
                    response.setFlash([{
                        msg: "Debes introducir al menos dos respuestas"
                    }]);
                    response.status(200);
                    response.redirect("/preguntas");
                }
            } else {
                next(err);
            }
        });
    } else {
        response.setFlash(["Debes introducir al menos dos respuestas"]);
        response.status(200);
        response.redirect("/preguntas");
    }
});
//**********FUNCION RANDOM PARA MOSTRAR PREGUNTAS *** */
/************************************************** */
function ObtenerPreguntasAleatorias(listaPreguntas) {
    var random = 0; //numero random entre 1 y el numero de preguntas que haya 
    var listaRandom = [];
    var preguntasEscogidas = [];
    var max = listaPreguntas.length; // por si acaso hay menos preguntas 
    if (max >= 5) max = 5;
    while (listaRandom.length != max) {
        random = Math.floor(Math.random() * listaPreguntas.length) + 1;
        var isIn = listaRandom.find(function (element) {
            return element === random;
        }); //busco si ya tengo este número random
        if (isIn == undefined) { //si no está lo añado a PreguntasEscogidas
            listaRandom.push(random);
        }
    }
    for (var i = 0; i < listaRandom.length; i++) {
        preguntasEscogidas.push(listaPreguntas[i]);
    }
    return preguntasEscogidas;
}
//*** Amigos a los que he adivinado */
function ListaAmigosAdivinados() {
    getGuessList
}
// Si nadie captura la llamada es un 404
app.use(function (request, response, next) {
    response.status(404);
    response.render("404", {
        usr: request.session.usuario,
    });
});

app.use((error, request, response, next) => {
    console.error(error.message);
    console.error(error.stack);
    next(error);
});

app.use((error, request, response, next) => {
    if (response.headersSent) {
        return next(error);
    }
    response.status(500);
    response.render("505", {
        mensaje: error.message,
        pila: error.stack,
        usr: request.session.usuario,
    });
});

// Arrancar el servidor
app.listen(config.port, (err) => {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});

function cargarUsuarioRedirigePerfil(idUsuario, next, request, response) {
    daoU.getUserData(idUsuario, (err, result) => {
        if (err) {
            next(err);
        } else {
            let usr = {
                email: result[0].email,
                nombre: result[0].nombre,
                puntos: result[0].puntos,
                apellidos: result[0].apellidos
            };
            request.session.usuario = usr;
            request.session.currentUser = result[0].id;
            response.redirect('my_profile');
        }
    });
}