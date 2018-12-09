// // Asignamos el callback para cuando cargue toda la página
// $(callback);

// function inicializar() {
//     let boton = document.getElementById("miBoton");
//     // ... configurar botón ...
// }

// // // Asignamos el callback para cuando cargue toda la página con una funcion anonima
// $(function () {
//     let boton = document.getElementById("miBoton");
//     // ... configurar botón ...
// })

// // Selector de objetos
// // selector es cualquier etiqueta css3
// // $(selector)
// // $("p")

// // Asigna un color de fondo a todos los elementos <li>
// let seleccion = $("li");
// seleccion.css("background-color", "#FFFFD0");
// // Lo anterior es equivalente a esto.
// $("li").css("background-color", "#FFFFD0");
// // Añade una clase a los elementos <p> de la clase 'entradilla'
// $("p.entradilla").addClass("seleccionado");

let candadoAbierto = true;
let destacado = true;

$(function () {
    let parrafos = $("p");
    // console.log(parrafos);

    // $("strong").css("background-color", "yellow");
    console.log($("ul").children());
    console.log($(".lista").children());
    console.log($(".lista").parents());
    console.log($(".lista").parents("div"));

    $("#botonAbrirCerrar").on("click", cambiarCandado);
    $("#botonInfo").on("click", mostrarInfo);
    $('#botonDestacar').on('click',destacar);
    $("strong").on("click", destacar);
})




function destacar() {
    destacado = !destacado;
    if (destacado) {
        $("strong").toggleClass("naranja");
    } else {
        $("strong").toggleClass("amarillo");
    }
}

function cambiarCandado() {
    candadoAbierto = !candadoAbierto;
    if (candadoAbierto) {
        $("#candado").prop("src", "img/candadoAbierto.png");
    } else {
        $("#candado").prop("src", "img/candadoCerrado.png");
    }
}

function mostrarInfo() {
    let edad = $("#campoEdad").prop("value");
    let fumador = $("#campoFumador").prop("checked");
    alert(`Tienes ${edad} años y ${fumador ? '' : 'no'} eres fumador`);
}