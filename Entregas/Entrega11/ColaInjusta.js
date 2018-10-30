function colaInjusta(parArray, reverse) {
    //Copiamos todo el array para no modificar el recibido por parámetro
    let myArray = parArray.slice();
    let arrayAux = myArray.slice(0, reverse);
    arrayAux.reverse();

    // Opción 1
    for (let index = 0; index < arrayAux.length; index++) {
        myArray.splice(index, 1, arrayAux[index])
    }

    // // Opción 2
    // myArray.splice(0, reverse);
    // myArray = arrayAux.concat(myArray);

    return myArray;
}

let array = [1, 2, 3, 4, 5];
let reverse = 3;
console.log(colaInjusta(array, reverse));
console.log(array);
array = [3, 5, 7];
reverse = 5;
console.log(colaInjusta(array, reverse));
console.log(array);
array = [];
reverse = 1;
console.log(colaInjusta(array, reverse));
console.log(array);
array = [5];
reverse = 1;
console.log(colaInjusta(array, reverse));
console.log(array);