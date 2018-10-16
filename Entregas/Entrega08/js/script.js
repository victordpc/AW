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

abrir_fichero("mio.txt");
// Abriendo fichero mio.txt en modo lectura
abrir_fichero("mio.txt", {
    solo_lectura: false
});
// Abriendo fichero mio.txt en modo lectura/escritura
abrir_fichero("mio.txt", {
    binario: true
});
// Abriendo fichero binario mio.txt en modo lectura
abrir_fichero("mio.txt", {
    binario: true,
    solo_lectura: false
});
// Abriendo fichero binario mio.txt en modo lectura/escritura
abrir_fichero("mio.txt", {
    solo_lectura: true,
    binario: false
});
// Abriendo fichero mio.txt en modo lectura