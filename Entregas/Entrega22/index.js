"use strict";

function mostrar() {
    $(".mostrar").show();
}

function ocultar() {
    $(".mostrar").hide();
}

function mostrarPosicion(event) {
    $(".mostrar").text(event.pageX + "x" + event.pageY);
}

function mostrarTeclaPulsada(event) {
    if (event.ctrlKey) {
        $(".teclaControl").addClass("fondoRosa")
    } else if(event.altKey) {
        $(".teclaAlt").addClass("fondoRosa")
    }else if(event.shiftKey){
        $(".teclaShift").addClass("fondoRosa")
    }
}

function limpiarTeclaPulsada(event) {
    $(".teclaControl").removeClass("fondoRosa")
    $(".teclaAlt").removeClass("fondoRosa")
    $(".teclaShift").removeClass("fondoRosa")
}

$(function () {
    $(".captura").on("mouseenter", mostrar);
    $(".captura").on("mouseleave", ocultar);
    $(".mostrar").hide();
    $(".captura").on("mousemove", mostrarPosicion);
    $(document).on("keydown",mostrarTeclaPulsada)  
    $(document).on("keyup",limpiarTeclaPulsada)  
})



// function abrirVentana() {
//     $("#ventana").show();
// }

// function cerrarVentana() {
//     $("#ventana").hide();
// }

// $(function () {
//     $("#mostrarVentana").on("click", abrirVentana);
//     $("#ventana span.cerrar").on("click", cerrarVentana);
//     $("#cerrar").on("click", cerrarVentana);
//     $("#campoNumero").on("change", pepe);
//     $("#anyadirElemento").on("click", addElement);
//     // Al pulsar el botón Incrementar, se incrementan la propiedad
//     // 'number' del párrafo.
//     $("#incrementar").on("click", incrementar);

//     // Al pulsar el botón Obtener, se muestra el valor actual de la
//     // propiedad 'number' del párrafo
//     $("#obtener").on("click", mostrarValor);

//     let parrafo = $("div.parrafo");
//     actualizarEtiqueta(parrafo);
//     // Cuando se pulsa el botón de aumentar anchura...
//     $("#aumentarAnchura").on("click", function () {
//         // Obtenemos la anchura actual y establecemos la nueva
//         let anchoActual = parrafo.width();
//         parrafo.width(anchoActual + 20);
//         // Actualizamos la etiqueta con la nueva dimensión
//         actualizarEtiqueta(parrafo);
//     });


//     $("body").on("keydown", function (event) {
//         let incremento = {
//             x: 0,
//             y: 0
//         };
//         switch (event.which) {
//             case IZQUIERDA:
//                 incremento.x = -10;
//                 break;
//             case DERECHA:
//                 incremento.x = 10;
//                 break;
//             case ARRIBA:
//                 incremento.y = -10;
//                 break;
//             case ABAJO:
//                 incremento.y = 10;
//                 break;
//         }
//         let current = parrafo.offset();
//         parrafo.offset({
//             left: current.left + incremento.x,
//             top: current.top + incremento.y
//         });
//         event.preventDefault();
//     });

// });

// // Actualiza la etiqueta de la esquina superior derecha con las
// // dimensiones del elemento pasado como parámetro
// function actualizarEtiqueta(elem) {
//     let ancho = Math.round(elem.width());
//     let alto = Math.round(elem.height());
//     $("div.tamaño").text(`${ancho} x ${alto}`);
// }

// function mostrarValor() {
//     alert($("#elem").data("number"));
// }

// function incrementar() {
//     let elemento = $("#elem");
//     let num = elemento.data("number");
//     elemento.data("number", num + 1);
// }

// function pepe() {
//     // Obtenemos valor actual
//     let valor = $(event.target).prop("value").trim();
//     if (valor === "") {
//         $("#mensaje").text("El campo está <strong>vacío</strong>");
//     } else if (isNaN(Number(valor))) {
//         $("#mensaje").text("No se ha introducido un número");
//     } else {
//         $("#mensaje").text("");
//     }
// }

// function addElement() {
//     let nuevoElemento = $("<li>Nuevo elemento</li>");
//     $("#listaNumerada").append(nuevoElemento);
// }

// function wUw() {
//     if (pTags.parent().is("div")) {
//         pTags.unwrap();
//     } else {
//         pTags.wrap("<div class='bordeRojo'></div>");
//     }
// }

// const IZQUIERDA = 37;
// const DERECHA = 39;
// const ARRIBA = 38;
// const ABAJO = 40;