// "use strict"

// x = [1,2,3]
// console.log(x instanceof Array); // true
// x = new Date();
// console.log(x instanceof Date); // true
// x = 14;
// console.log(x instanceof Array); // false
// console.log(x instanceof Date); // false

// x = [1,2,3]
// console.log(x instanceof Object); // true
// x = new Date();
// console.log(x instanceof Object); // true
x = 14;
console.log(x instanceof Object); // false
console.log(typeof(x)); 
console.log(typeof(x) == "number"); // false

// x = NaN;
// console.log(x instanceof Object);
// console.log(x instanceof Number);
// console.log(x instanceof Object);
// console.log(typeof(x)); 


// let x = {
//     nombre: "Ana María",
//     apellidos: "Gamboa Esteban",
//     edad: 54
// };
// let y = {};

// // console.log(x["apellidos"])

// let atrib = "nombre";
// // console.log(x[atrib]) // → "Ana María"

// x.edad = x.edad + 1; // o bien: x.edad++
// x["nombre"] = "Ana Josefa";

// x.direccion = "Calle Bautista, 25";
//  y.nombre = "Javier";
// //  console.log(x)
// // // { nombre: 'Ana Josefa', apellidos: 'Gamboa Esteban', edad: 55,
// // // direccion: "Calle Bautista, 25" }
// // console.log(y)
// // { nombre: 'Javier' }


// let z = {
//     "Atributo con espacios": 21,
//     "14": "foo",
//     "false": "ok"
// };

// console.log(z)


// let x = {
//     nombre: "Ana María",
//     apellidos: "Gamboa Esteban",
//     edad: 54
// };

// console.log(Object.keys(x))
    