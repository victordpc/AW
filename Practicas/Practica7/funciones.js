function incrementar(x) {
    return x + 1;
}

function duplicar(x) {
    return 2 * x;
}

function cuadrado(y) {
    return y * y;
}

function factorial(n) {
    if (n <= 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

function decrementar(x) {
    return x - 1;
}

// let i = incrementar;
// console.log(i(5));
// console.log(incrementar(5));
// // Imprime: 6
// let ff = factorial;
// console.log(ff(10));
// // Imprime: 3628800

function aplicar_funciones(funs, z) {
    for (let i = 0; i < funs.length; i++) {
        console.log(
            `Aplicar función ${i} pasando ${z}: ${funs[i](z)}`
        );
    }
}

// aplicar_funciones([incrementar, duplicar, cuadrado, factorial, decrementar], 5);


// function buscar_por_nombre(nombre) {
//     switch (nombre) {
//         case "INC": return incrementar;
//         case "DUP": return dup;
//         case "SQR": return cuadrado;
//         case "FCT": return factorial;
//         case "DEC": return decrementar;
//     }
//     // Si la función termina sin alcanzar un return,
//     // se considera que devuelve undefined
// }

// // var g = buscar_por_nombre("DEC");
// // console.log(g(10));

// let f = function () { console.log("Hola"); };
// f();
// let g = function (x, y) { return x + y; };
// console.log(g(3, 5));


// aplicar_funciones(
//     [ function(x) { return x - 3; },
//     function(x) { return Math.sqrt(x); },
//     factorial,
//     function(z) { return Math.log(z); } ], 2);

// // ¿Puede reemplazarse la referencia a factorial por otra función anónima?
// // Mirar callee y arguments en JavaScript

"use strict";
let s;
let y;
let inc;
s = suma(6, 7); // Se ejecuta sin problemas
function suma(a, b) {
    return a + b;
}
console.log(s)
// y = inc(8); // TypeError: inc is not a function
inc = function (x) { return ++x; };
y = inc(8); // Aquí funciona
console.log(y)


aplicar_funciones(
    [x => x - 3,
    x => Math.sqrt(x),
        factorial,
    x => Math.log(x)]
    , 2);
