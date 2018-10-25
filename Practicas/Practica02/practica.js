let listaTareas = [{
        text: "Preparar práctica AW",
        tags: ["AW", "practica"]
    },
    {
        text: "Mirar fechas congreso",
        done: true,
        tags: []
    },
    {
        text: "Ir al supermercado",
        tags: ["personal"]
    },
    {
        text: "Mudanza",
        done: false,
        tags: ["personal"]
    },
];


console.log(getToDoTasks(listaTareas))


function getToDoTasks(listaTareas) {
    let resultado = listaTareas.filter(tarea => tarea.done != true).map(tarea => tarea.text);
    return resultado;
}


console.log(findByTag(listaTareas, "personal"))

function findByTag(listaTareas, parametro) {
    let resultado = listaTareas.filter(tarea => tarea.tags.some(tag => tag == parametro) == true);
    return resultado;
}


console.log(findByTags(listaTareas, ["personal", "practica"]))

function findByTags(listaTareas, parametro) {
    let resultado = listaTareas.filter(
        tarea => tarea.tags.some(
            tag => parametro.some(
                par => par == tag
            ) == true
        ) == true);
    return resultado;
}


console.log(countDone(listaTareas))

function countDone(listaTareas) {
    let resultado = listaTareas.filter(tarea => tarea.done == true).length;
    return resultado;
}


console.log(createTask("Ir al medico @personal @salud"));
console.log(createTask("@AW            @practica Preparar práctica AW"));
console.log(createTask("Ir a @deporte entrenar"))

function createTask(texto) {
    let expEspacios = /[ ]+/
    let expTags = /@([\w]+)/g
    // let expTags2 = /@([\w ]+)\g/
    texto= texto.replace(expEspacios," ");
    var separados =texto.match(expTags);

    let tarea ={
    done: false,
    text: texto.replace(expTags,"").replace(expEspacios," ").trim(),
    tags: separados,
    };
    // tags: ["personal"]
    return tarea;
}