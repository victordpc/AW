const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

let app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
    secret: 'frase secreta',
    resave: false,
    saveUninitialized: true,
}));

app.use((request, response, next) => {
    if (request.session.historial === undefined) {
        request.session.historial = [];
    }
    response.locals.historial = request.session.historial;
    next();
});

/*
 * Al acceder a la ruta raíz, debemos mostrar la plantilla con el resultado vacío.
 */
app.get("/", (request, response) => {

    // --------------------------------------------
    // Completar ejercicio 2
    // --------------------------------------------

    response.render("calculadora", {
        resultado: ""
    });

});

/*
 * Manejador de ruta GET para realizar operaciones.
 */
app.get("/calc", (request, response) => {

    // --------------------------------------------
    // Completar ejercicio 2
    // --------------------------------------------

    // Si los cuadros de texto están vacíos, devolvemos ERROR
    if (request.query.operand1.trim() === "" || request.query.operand2.trim() === "") {
        response.render("calculadora", {
            resultado: "Error"
        });
    } else {
        let op1 = Number(request.query.operand1);
        let op2 = Number(request.query.operand2);
        let operator = request.query.operator;

        if (isNaN(op1) || isNaN(op2)) {
            response.render("calculadora", {
                resultado: "Error"
            });
        }

        let result;
        let cadena;
        switch (operator) {
            case "+":
                result = op1 + op2;
                break;
            case "-":
                result = op1 - op2;
                break;
            case "*":
                result = op1 * op2;
                break;
            case "/":
                result = op2 !== 0 ? op1 / op2 : "Error";
                break;
        }
        if (result !== "ERROR") {
            request.session.historial.unshift(`${op1} ${operator} ${op2} = ${result}`);
        }
        response.render("calculadora", {
            resultado: result,
            historial: request.session.historial
        });
    }
});

/*
 * Manejador POST para borrar la ruta del hostiral. Recibe un parámetro
 * `index` con el índice de la entrada del historial a borrar. 
 */
app.post("/deleteHistory", (request, response) => {

    // --------------------------------------------
    // Completar ejercicio 2
    // --------------------------------------------

    request.session.historial.splice(request.body.index, 1);
    response.render("calculadora", {
        resultado: "",
        historial: request.session.historial
    });
});

app.listen(3000, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});