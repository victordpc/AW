// let aa = [23, 12, 69, 11, 34, 45];
// aa.estaOrdenado = false;
// console.log(aa);

let a = [23, 12, 69, 11, 34, 45];
a.length += 2; // Ampliamos el array
console.log(a); // → [ 23, 12, 69, 11, 34, 45, , ]
a.length = 3; // Reducimos el array
console.log(a); // → [ 23, 12, 69 ]

a[5] = 32; // Amplia el array hasta que tenga hueco para el
console.log(a); // → [ 23, 12, 69, , , 32 ]

// console.log(a[35])



// C:\"Program Files"\nodejs\node.exe --inspect-brk=14923 Practicas\Practica7\arrays.js
// C:\"Program Files"\nodejs\node.exe  Practicas\Practica7\arrays.js 
