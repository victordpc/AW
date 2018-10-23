// let c = {
//     r: 1,
//     i: 1,
//     modulo: function () {
//         return Math.sqrt(this.r * this.r +
//             this.i * this.i);
//     },
//     argumento: function () {
//         return Math.atan2(this.i, this.r);
//     }
// };

// function construirComplejo(real, imag) {
//     return {
//         r: real,
//         i: imag,
//         modulo: function () {
//             return Math.sqrt(this.r * this.r + this.i * this.i);
//         },
//         argumento: function () {
//             return Math.atan2(this.i, this.r);
//         }
//     }
// }

function moduloComplejo() {
    return Math.sqrt(this.r * this.r + this.i * this.i);
}

function argumentoComplejo() {
    return Math.atan2(this.i, this.r);
}

function construirComplejo(real, imag) {
    return {
        r: real,
        i: imag,
        modulo: moduloComplejo,
        argumento: argumentoComplejo
    }
}

// var c1 = construirComplejo(-3, 0);
// console.log(c1.argumento()); // → 3.141592653589793
// var c2 = construirComplejo(1, 1);
// console.log(c2.modulo()); // → 1.4142135623730951
// console.log(c); // → 1.4142135623730951



// Al añadir este mñetodo solo se lo damos a c1, no a todos los objetos creados con construirComplejos
// c1.coordenadasPolares = function () {
//     console.log(`(${this.modulo()}, ${this.argumento()})`);
// }
// Para añadirlo a todos usamos prototipos


// Así creamos con prototipo
// Tenemos un objeto y que usa a x como prototipo
// let y = Object.create(x);



// let c1 = Object.create(c)


// console.log(c)
// console.log(c1.modulo())
// En este punto tenemos a c1 vacio pero si podemos acceder a sus atributos en tiempo de ejecución
// esto es por que se busca en tiempo de ejecución por todos los prototipos existentes hasta que se encuentra
// o se llega a la raiz de la cadena de prototipos

// Para que nuestro objeto tenga atributos tenemos que asignarles un valor
// c1.i = 8
// c1.r = 0

// console.log(c)
// console.log(c1)
// En este caso i y r son atributos propios del objeto c1



let circulo = {
    centro: {
        x: 0,
        y: 0
    },
    radio: 5
};
let c1 = Object.create(circulo);
let c2 = Object.create(circulo);

circulo.grosorBorde =2;
console.log(c1.grosorBorde); // → 2
console.log(c2.grosorBorde); // → 2

// Al usar el prototipado para crear los objetos y añadir un nuevo atributo a circulo se añade en el arbol de prototipos 
// y se puede usar por sus hijos prototipados

console.log(c1.radio); // → 5
console.log(c1.centro); // → {x:0, y:0

// Al cambiar el valor de c1 se lo cambiamos solo a el
c1.centro = {x:8, y:9};
console.log(c1.centro); // → {x:8, y:9}
console.log(c2.centro); // → {x:0, y:0}

// Al cambiar solo el valor de un atributo de centro, se lo cambiamos al prototipo
c1.centro.x = 4;
console.log(circulo.centro); // → {x:4, y:0}
console.log(c1.centro); // → {x:4, y:0}
console.log(c2.centro); // → {x:4, y:0}