// Esto falla por que no esta definido suma
// let g = function suma(x, y) { return x + y; };
// console.log(suma(3, 5)); // ReferenceError: suma is not defined



// Si le ponemos nombre a la función la podemos usar de forma recursiva
// var factorial = function fac(n) {
//     return n < 2 ? 1 : n * fac(n - 1)
// };
// console.log(factorial(3));




function imprimirArgumentos(a1, a2, a3) {
    console.log(`a1: ${a1}`);
    console.log(`a2: ${a2}`);
    console.log(`a3: ${a3}`);
}
// imprimirArgumentos(1, true, "foo");

// Si pasamos de más se ignoran 
// imprimirArgumentos("uno", "dos", "tres", "cuatro");


// Si pasamos de menos se ignoran 
// imprimirArgumentos("uno", "dos");



function abrir_fichero(nombre, ops = {}) {
    // Inicialización de los parámetros nominales no pasados
    if (ops.solo_lectura === undefined) ops.solo_lectura = true;
    if (ops.binario === undefined) ops.binario = false;
    // Cuerpo de la función
    console.log(`Abriendo fichero ${ops.binario ? "binario " : ""}` +
        `${nombre} en modo ` +
        `${ops.solo_lectura ? "lectura" : "lectura/escritura"}`);
}

//  Podemos asignarle valores a los parametros por nombre sin acordarnos del orden ya que la funcion recibe un array de opcionales

// abrir_fichero("mio.txt");
// // Abriendo fichero mio.txt en modo lectura
// abrir_fichero("mio.txt", {
//     solo_lectura: false
// });
// // Abriendo fichero mio.txt en modo lectura/escritura
// abrir_fichero("mio.txt", {
//     binario: true
// });
// // Abriendo fichero binario mio.txt en modo lectura
// abrir_fichero("mio.txt", {
//     binario: true,
//     solo_lectura: false
// });
// // Abriendo fichero binario mio.txt en modo lectura/escritura
// abrir_fichero("mio.txt", {
//     solo_lectura: true,
//     binario: false
// });
// // Abriendo fichero mio.txt en modo lectura



function imprimeArgumentos(a, b, c) {
    for (let i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}
// imprimeArgumentos(1, 2, 3); // Imprime 1 2 3


function minimo(a) {
    let min = arguments[0];
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] < min) {
            min = arguments[i];
        }
    }
    return min;
}
//Si usamos arguments para recorrer los valores podemos llamar de varis formas a la funcion, ella siempre lo mete en el "array" de entrada
// console.log(minimo()); // undefined
// console.log(minimo(1)); // 1
// console.log(minimo(3, 4, 5)); // 3
// console.log(minimo(9, 8, 7, 6, 5, 4, 3, 2, 1, 0)); // 0


var empleado = {
    nombre: "Manuel",
    saludar: function () {
        console.log("¡Hola! " + this.nombre);
    },
    cambiarNombre: function (nuevoNombre) {
        this.nombre = nuevoNombre;
    }
};

var otro_empleado = {
    nombre: "David",
    saludar: empleado.saludar //Aqui usamos el metodo saludar del objeto empleado
};

// // Al usar this en el método saludar se usa el this del objeto del que se llama, David en este caso
// otro_empleado.saludar(); // → ¡Hola, David!

// empleado.saludar(); // → ¡Hola!
// // console.log(empleado.nombre)

// empleado.despedir = function () {
//     console.log("¡Adios! " + this.nombre);
// };
// empleado.despedir(); // → ¡Adios!




let personas = [{
        nombre: "Ricardo",
        edad: 45
    },
    {
        nombre: "Julia",
        edad: 24
    },
    {
        nombre: "Ashley",
        edad: 28
    }
];

// personas.forEach(p => {
//     console.log("Hola, me llamo " + p.nombre +
//         " y tengo " + p.edad + " años");
// })

// personas.forEach((v,i,a) => {
//     console.log("Hola,me llamo " + v.nombre
//     + " y tengo " + v.edad + " años"
//     + " y soy el " + i + " de un array de "
//     + a.length +" elementos" );
//     })

// for (let index = 0; index < personas.length; index++) {
//     const v = personas[index];
//     i=index
//     a=personas
//     console.log("Hola,me llamo " + v.nombre
//     + " y tengo " + v.edad + " años"
//     + " y soy el " + i + " de un array de "
//     + a.length +" elementos" );
// }


// var a1 = [1, 3, 5, 2, 4];
// let dobles = a1.map(n => n * 2);
// console.log(dobles); // → [2, 6, 10, 4, 8]


// var a2 = [1, 3, 5, 2, 4];
// var sonNumeros = a2.every(n => typeof n === "number");
// console.log(sonNumeros); // → true
// var b2 = [1, 2, "foo"];
// var sonNumeros = b2.every(n => typeof n === "number");
// console.log(sonNumeros); // → false



// var a3 = [1, 3, 5, 2, 4];
// var sonNumeros = a3.some(n => typeof n === "number");
// console.log(sonNumeros); // → true
// var b3 = [1, 2, "foo"];
// var sonNumeros = b3.some(n => typeof n === "number");
// console.log(sonNumeros); // → false


let a4 = [2, 6, 9, 1];
console.log(
    "Valor final: " +
    a4.reduce((ac, n) => 2 * ac + n, 7)); // → 171
// Aquí empieza en 7 y suma el doble de cada elemento del array 


console.log(
    [1, 5, 7, 4].reduce((ac, n) => ac + n, 0))
console.log(
    [1, 5, 7, 4].reduce((ac, n) => ac * n, 1))
console.log(
    [6, 1, 4, 3, 7].reduce((ac, x) => Math.max(ac, x), -Infinity))

