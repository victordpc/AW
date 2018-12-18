"use strict";

const config = require("./config");
const express = require("express");
const path = require("path");

// Crear un servidor Express.js
const app = express();
// Configuramos el motor de plantillas
app.set("view engine", "ejs");
// Definimos el directorio de plantillas
app.set("views", path.join(__dirname, "public", "views"));
// Middleware Static
const ficherosEstaticos = path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));


var currencyRates = {
    "USD": 1.00000, // Dólar estadounidense
    "EUR": 0.94466, // Euro
    "GBP": 0.82314, // Libra
    "INR": 68.1762, // Rupia india
    "AUD": 1.35989, // Dólar australiano
    "CAD": 1.32303, // Dólar canadiense
    "ZAR": 13.6627, // Rand sudafricano
    "NZD": 1.42890, // Dólar neozelandés
    "JPY": 115.933 // Yen japonés
};

// Servicio 1: Obtener los distintos tipos de moneda disponibles.
// Método: GET
// URL: /currencies
// Parámetros de entrada: Ninguno.
// Códigos de respuesta: 200 (OK) o 500 si hubo error.
// Tipos resultado: JSON.
// Resultado: Lista con las denominaciones de las distintas divisas contenidas en el objeto currencyRates.
// Debe ser un array de cadenas como, por ejemplo, ["USD", "EUR", "GBP", ...].
app.get("/currencies", function (request, response) {
    try {
        response.json(currencyRates);
    } catch (err) {
        response.status(500);
        response.end();
    }
});

// Servicio 2: Convertir una cantidad entre dos divisas:
// Método: GET
// URL: /currency
// Parámetros de entrada: Nombre de divisa origen (from), divisa destino (to) y cantidad a convertir (quantity). Estos tres parámetros van incluidos en la propia URL, como una query string.
// Códigos de respuesta: 200 (OK), 400 (Bad request) si se introdujo algún parámetro incorrectamente, o 500 si hubo cualquier otro tipo de error.
// Tipos resultado: JSON.
// Resultado: Objeto con dos atributos: currency, con la denominación de la divisa destino y result con la cantidad resultante en la divisa destino.
// /currency?from=GBP&to=EUR&quantity=25
app.get("/currency", function (request, response) {
    try {
        let from = request.query.from;
        let to = request.query.to;
        let quantity = Number(request.query.quantity);

        if ((currencyRates[from] !== undefined) ||
            (currencyRates[to] !== undefined) ||
            (!isNaN(quantity))
        ) {
            // El parámetro "indice" es un número y
            // está dentro de los límites del array.
            // Se devuelve el elemento correspondiente.
            let origen = currencyRates[from];
            let destino = currencyRates[to];

            let resultado = {
                currency: to,
                result: quantity / origen * destino
            }

            response.json(resultado);
        } else {
            // En caso contrario, se devuelve el error 404
            response.status(400);
            response.end();
        }
    } catch (err) {
        response.status(500);
        response.end();
    }
});

app.get("/", function (request, response) {
    response.render("index");
});


app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});