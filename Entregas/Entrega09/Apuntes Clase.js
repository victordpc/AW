
var expr=/[A-Z][0-9]{3}/;
var expr2 = new RegExp('[A-Z][0-9]{3}');

/[A-Z][0-9]{3}/.test("A655"); // → true
/[A-Z][0-9]{3}/.test("__A655__"); // → true
/[A-Z][0-9]{3}/.test("Otra cosa"); // → false
let idValido = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/;
idValido.test("8cte"); // → false
idValido.test("_cte"); // → true
console.log(idValido.test("8cte")); // → false
console.log(idValido.test("_cte")); // → false

console.log(/\d{3}/.exec("123 456 789")); // → ["123", index: 0, ...]
console.log(/\w+@\w+/.exec("abc")); // → null
console.log(/\w+@\w+/.exec("Esto es un correo nombre_apellidos@correo"));
// → ["nombre_apellido@correo", index: 18,...]



var str = "a aa aaa";
console.log(str.match(/a+/)); // → ["a", index: 0, input:"a aa aaa",groups:undefin
console.log(str.match(/a+/g));// → ["a", "aa", "aaa"]
str = "HolA";
console.log(str.match(/hola/)); // → null
console.log(str.match(/hola/i)); // → ["HolA",index:0, input:"HolA", groups:undefi