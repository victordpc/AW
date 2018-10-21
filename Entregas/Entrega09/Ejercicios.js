// Ejercicio 6

// Escribe una función mapFilter(array, f) que se comporte como map, pero descartando los 
// elementos obj de la entrada tales que f(obj) devuelve undefined. Por ejemplo:


resultado = mapFilter(["23", "44", "das", "555", "21"],
    (str) => {
        let num = Number(str);
        if (!isNaN(num)) return num;
    })
// Devuelve: [23, 44, 555, 21]

console.log(resultado)

function mapFilter(array, func) {
    let temporal = array.filter(func)
    return temporal.map(func);
}


// Ejercicio 7

// Utilizando expresiones regulares, implementar la función interpretarColor(str) que,
// dada una cadena que representa un color en formato hexadecimal #RRVVAA  
// devuelva un objeto con tres atributos (rojo, verde y azul) con el valor (en base 10) 
// de la componente correspondiente.

// Si la cadena de entrada no es un color HTML válido, se devuelve null.

// Indicación: se puede utilizar parseInt para realizar conversiones entre distintas bases.


function interpretaColor(str) {
    var exp = /[#]{1}[A-F0-9]{6}/;
    var expr2 = /[#]([A-F0-9]{2})([A-F0-9]{2})([A-F0-9]{2})/;
    let resultado = null;

    if (exp.test(str)) {
        resultado = {};
        var separados = expr2.exec(str);
        resultado.rojo = separados[1];
        resultado.verde = separados[2];
        resultado.azul = separados[3];
    }
    return resultado;
}

test1 = interpretaColor("#FF234B")
console.log(test1);
test1 = interpretaColor("#ff234b")
console.log(test1);
test1 = interpretaColor("#PF234B")
console.log(test1);
