// Ejercicio 1

// Escribir una función producto que reciba dos parámetros (llamados x e y) y devuelva su producto, teniendo en cuenta que tanto la x como la
//  y pueden ser números o vectores (representados como arrays). La función se comportará del siguiente modo:
// Si x e y son números, se calculará su producto.
// Si x es un número e y es un vector (o viceversa), se calculará el vector que resulta de multiplicar todas los componentes de y por x.
// Si x e y son vectores de la misma longitud, se calculará el producto escalar de ambos.
// En cualquier otro caso, se lanzará una excepción.

function producto(x, y) {

    if (typeof (x) == "number" && typeof (y) == "number") {
        resultado = x * y;
    } else if (x instanceof Array && y instanceof Array && x.length == y.length) {
        resultado = 0;
        for (var i = 0; i < x.length; i++) {
            resultado += x[i] * y[i];
        }
    } else if (typeof (x) == "number") {
        for (var i = 0; i < y.length; i++) {
            y[i] = y[i] * x;
        }
        resultado = y;
    } else if (typeof (y) == "number") {
        for (var i = 0; i < x.length; i++) {
            x[i] = x[i] * y;
        }
        resultado = x;
    } else {
        throw ("Excepcion parametros no contemplados");
    }
    return resultado;
}

// console.log(producto(4, 5));
// console.log(producto([4, 4], [5, 5]));
// console.log(producto(4,[5,5]));
// console.log(producto([4, 4], 6));



// Ejercicio 2

// Escribir una función sequence que reciba un array de funciones [f_1, ..., f_n] y un elemento inicial x. La función debe aplicar f_1 a x, 
// y pasar el resultado a f_2 que a su vez, le pasará el resultado a f_3 y así sucesivamente. Se piden tres versiones difere:
// 1 Implementar la función sequence1 suponiendo que ninguna de las funciones del array recibido devuelve el valor undefined.

function sequence1(funs, x) {
    // funs.array.forEach(element => {
    //  resultado = element(x);
    // });
    for (let i = 0; i < funs.length; i++) {
        resultado = funs[i](x);
    }
    return resultado;
    // console.log(resultado);
}



// 2 Implementar la función sequence2 para que, en el caso en que una función del array devolviera el valor undefined, 
// la función sequence2 devuelva directamente undefined sin seguir ejecutando las funciones restantes.

function sequence2(funs, x) {
    // funs.array.forEach(element => {
    //  resultado = element(x);
    // });
    for (let i = 0; i < funs.length; i++) {
        resultado = funs[i](x);
        if (resultado == undefined) {
            return undefined;
        }
    }
    return resultado;
    // console.log(resultado);
}



// 3 Implementar la función sequence3 para que reciba un tercer parámetro opcional (right), cuyo valor por defecto será false. 
// Si el parámetro right tiene el valor true, el recorrido del elemento por las funciones será en orden inverso: desde la última función 
// del array hasta la primera.
// (NOTA: dentro de una función se puede comprobar que el último parámetro no está presente comparándolo con undefined).


function sequence3(funs, x, right = false) {
    // funs.array.forEach(element => {
    //  resultado = element(x);
    // });
    if (!right) {
        for (let i = 0; i < funs.length; i++) {
            resultado = funs[i](x);
            if (resultado == undefined) {
                return undefined;
            }
        }
    } else {
        for (let i = funs.length - 1; i > 0; i++) {
            resultado = funs[i](x);
            if (resultado == undefined) {
                return undefined;
            }
        }
        return resultado;
        // console.log(resultado);
    }
}








// Ejercicio 3

// 1 Escribir una función pluck(objects, fieldName) que devuelva el atributo de nombre fieldName de cada uno de los objetos contenidos en el array objects de entrada. Se devolverá un array con los valores correspondientes. Por ejemplo:

// let personas = [
// {nombre: "Ricardo", edad: 63},
// {nombre: "Paco", edad: 55},
// {nombre: "Enrique", edad: 32},
// {nombre: "Adrián", edad: 34}
// ];
// pluck(personas, "nombre") // Devuelve: ["Ricardo", "Paco", "Enrique", "Adrián"]
// pluck(personas, "edad") // Devuelve: [63, 55, 32, 34]









// 2 Implementar una función partition(array, p) que devuelva un array con dos arrays. El primero contendrá los elementos x de array tales que p(x) devuelve true. Los restantes elementos se añadirán al segundo array. Por ejemplo:

// partition(personas, pers => pers.edad >= 60)
// // Devuelve:
// // [
// // [ {nombre: "Ricardo", edad: 63} ],
// // [ {nombre: "Paco", edad: 55}, {nombre: "Enrique", edad: 32},
// // {nombre: "Adrián", edad: 34} ]
// // ]









// 3 Implementar una función groupBy(array, f) que reciba un array, una función clasificadora f, y reparta los elementos del array de entrada en distintos arrays, de modo que dos elementos pertenecerán al mismo array si la función clasificadora devuelve el mismo valor para ellos. Al final se obtendrá un objeto cuyos atributos son los distintos valores que ha devuelto la función clasificadora, cada uno de ellos asociado a su array correspondiente. Ejemplo:

// groupBy(["Mario", "Elvira", "María", "Estela", "Fernando"],
// str => str[0]) // Agrupamos por el primer carácter
// // Devuelve el objeto:
// // { "M" : ["Mario", "María"], "E" : ["Elvira", "Estela"], "F" : ["Fernando"] }









// 4 Escribir una función where(array, modelo) que reciba un array de objetos y un objeto modelo. La función ha de devolver aquellos objetos del array que contengan todos los atributos contenidos en modelo con los mismos valores. Ejemplo:

// where(personas, { edad: 55 })
// // devuelve [ { nombre: 'Paco', edad: 55 } ]

// where(personas, { nombre: "Adrián" })
// // devuelve [ { nombre: 'Adrián', edad: 34 } ]

// where(personas, { nombre: "Adrián", edad: 21 })
// // devuelve []

