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



// let circulo = {
//     centro: {
//         x: 0,
//         y: 0
//     },
//     radio: 5
// };
// let c1 = Object.create(circulo);
// let c2 = Object.create(circulo);

// circulo.grosorBorde =2;
// console.log(c1.grosorBorde); // → 2
// console.log(c2.grosorBorde); // → 2

// // Al usar el prototipado para crear los objetos y añadir un nuevo atributo a circulo se añade en el arbol de prototipos 
// // y se puede usar por sus hijos prototipados

// console.log(c1.radio); // → 5
// console.log(c1.centro); // → {x:0, y:0

// // Al cambiar el valor de c1 se lo cambiamos solo a el
// c1.centro = {x:8, y:9};
// console.log(c1.centro); // → {x:8, y:9}
// console.log(c2.centro); // → {x:0, y:0}

// // Al cambiar solo el valor de un atributo de centro, se lo cambiamos al prototipo
// c1.centro.x = 4;
// console.log(circulo.centro); // → {x:4, y:0}
// console.log(c1.centro); // → {x:4, y:0}
// console.log(c2.centro); // → {x:4, y:0}


// Podemos ver si algo es prototipo o esta en la cadena de prototipo
// let persona = {
//     nombre: "",
//     apellidos: ""
// }
// let medico = Object.create(persona);
// medico.especialidad = "";
// console.log(Object.getPrototypeOf(medico) === persona); // → true
// console.log(Object.getPrototypeOf(medico) === Object.prototype); // → false
// console.log(Object.getPrototypeOf(persona) === Object.prototype); // → true



// SE CREA UN OBJETO-PROTOTIPO QUE CONTIENE LOS MÉTODOS
let prototipoComplejo = {
    modulo: function () {
        return Math.sqrt(this.r * this.r + this.i * this.i);
    },
    argumento: function () {
        return Math.atan2(this.i, this.r);
    }
};
// SE PROGRAMA UNA FUNCIÓN QUE CREA UN OBJETO A PARTIR DEL PROTOTIPO
// Y LE CREA SUS PROPIOS ATRIBUTOS
function construirComplejo(real, imag) {
    var resultado = Object.create(prototipoComplejo);
    resultado.r = real;
    resultado.i = imag;
    return resultado;
}

// var c1 = construirComplejo(-3, 0);
// var c2 = construirComplejo(1, 1);


// toString() Este método es invocado automáticamente cada vez que un
// objeto es referido en un contexto en el que se espera una
// cadena.
prototipoComplejo.toString = function () {
    return "(" + this.r + "," + this.i + ")";
}
// let c3 = construirComplejo(1, 3);
// alert(c3);
// console.log(c3.toString()); // → (1,3)

// valueOf Este método es invocado automáticamente cada vez que un
// objeto se encuentra en una posición en la que se espera un
// valor primitivo (un número, un booleano, etc)
let prototipoPersona = {
    valueOf: function () {
        return this.edad;
    }
};

function construirPersona(nom, ap, e) {
    var resultado = Object.create(prototipoPersona);
    resultado.nombre = nom;
    resultado.apellido = ap;
    resultado.edad = e;
    return resultado;
}
// var p1 = construirPersona("Juan", "Gómez", 15);
// var p2 = construirPersona("Ana", "Torres", 18);
// console.log(p1 + p2); // → 33


// hasOwnProperty() Este método permite conocer si un objeto tiene un atributo
// propio o por el contario dicho atributo está en la cadena de prototipos.
let circulo = {
    centro: {
        x: 0,
        y: 0
    },
    radio: 5
};
let cc1 = Object.create(circulo);
let cc2 = Object.create(circulo);
// console.log(cc1.hasOwnProperty("radio")); // → false
cc1.radio = 10;
// console.log(cc1.hasOwnProperty("radio")); // → true

// Clases o algo asi

class Complejo {
    constructor(real, imag) {
        this.r = real;
        this.i = imag;
    }
    modulo() {
        return Math.sqrt(this.r * this.r + this.i * this.i);
    }
    argumento() {
        return Math.atan2(this.i, this.r);
    }
}

let c1 = new Complejo(-3, 0);
let c2 = new Complejo(1, 1);

console.log(c1.modulo()); // → 3
console.log(c2.modulo()); // → 1.4142135623730951

console.log(Object.getPrototypeOf(c1) === Complejo); // → true
console.log(Object.getPrototypeOf(Complejo) === Object.prototype); // → false

// Cuidado que la clase que genera no es la del nombre, le añade .prototype
console.log(Object.getPrototypeOf(Complejo.prototype) === Object.prototype); // → true

// instanceof La expresión x instanceof C se evalúa a true si el objeto
// C.prototype es alcanzable ascendiendo desde x en la
// cadena de prototipos:
var x = new Complejo(-3, 0);
console.log(x instanceof Complejo); // → true
console.log(x instanceof Object); // → true
console.log(x instanceof Number); // → false


// Con estas funciones podemos ver si un objeto es prototipo directo de otro o esta dentro de lacadena de prototipado
let a = new Array(3);
console.log(a instanceof Array); // → true
console.log(a instanceof Object); // → true
console.log(Object.getPrototypeOf(a) === Array.prototype); // → true
console.log(Object.getPrototypeOf(a) === Object.prototype); // → fals
console.log(Array.prototype.isPrototypeOf(a)); // → true
console.log(Object.prototype.isPrototypeOf(a)); // → true


// get/set
// Permiten definir métodos cuya invocación es
// sintácticamente similar a los atributos.
// Permiten asegurar la calidad de los datos.

class Complejo2 {
    constructor(real = 1, imag = 1) {
        this.r = real;
        this.i = imag;
    }
    modulo() {
        return Math.sqrt(this.r * this.r + this.i * this.i)
    }

    get modulo2() {
        return Math.sqrt(this.r * this.r + this.i * this.i)
    }
}
let c = new Complejo2(1, 0);
console.log(c.modulo()); // → 1
console.log(c.modulo2); // → 1


class Complejo3 {
    constructor(real = 1, imag = 1) {
        this.r = real;
        this.i = imag;
    }
    escala(e) {
        if (e > 0) {
            this.r = this.r * e;
            this.i = this.i * e;
        }
    }
    set escala2(e) {
        if (e > 0) {
            this.r = this.r * e;
            this.i = this.i * e;
        }
    }
}
let cc = new Complejo3(1, 0);
cc.escala(2);
cc.escala2 = 2;
console.log(cc); // → {r:2, i:0}