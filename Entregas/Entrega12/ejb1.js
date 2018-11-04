const myModulo = require("./ejNode.js");

myModulo.free("Entregas/Entrega12/fichTexto.txt", /[0-9]+/g, '{numero}', callBack);

function callBack(err) {
    if (err) {
        console.log("Error catastrofico")
    } else {
        console.log("Exito maravilloso")
    }
}