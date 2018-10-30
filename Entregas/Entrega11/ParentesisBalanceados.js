function parentesisBalanceados(cadena) {
    var pila = [];
    let resultado = true;
    for (let index = 0; index < cadena.length && resultado; index++) {
        let element = cadena[index];
        if (element === '(' || element === '{' || element === '[') {
            pila.push(element);
        } else if (element === ')' || element === '}' || element === ']') {
            let comparator = pila.pop();
            if (element === ')' && comparator !== '(' ||
                element === ']' && comparator !== '[' ||
                element === '{' && comparator !== '}')
                resultado = false;
        }
    }
    return resultado;
}

let cadena1 = '([{}])()';
let cadena2 = '({)}';
let cadena3 = '';
let cadena4 = ':)';
let cadena5 = '';
let cadena6 = '.';

console.log(parentesisBalanceados(cadena1));
console.log(parentesisBalanceados(cadena2));
console.log(parentesisBalanceados(cadena3));
console.log(parentesisBalanceados(cadena4));
console.log(parentesisBalanceados(cadena5));
console.log(parentesisBalanceados(cadena6));



