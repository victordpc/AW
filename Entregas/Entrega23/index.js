"use strict";

$(function () {
    // $("#listaElementos li").on("click", function (event) {
    // tenemos que cambiar el evento por este para que encuentre las nuevas filas añadidas
    $("#listaElementos").on("click", " li ", function (event) {
        // event.target contiene un elemento del DOM
        // Construir una selección a partir de él:
        let elementoPulsado = $(event.target);
        // También valdría elementoPulsado = $(this)
        // Mostrar mensaje con el contenido del <li>:
        alert("Has hecho clic en " + elementoPulsado.text());
    });

    let contador = 3;
    $("#anyadir").on("click", function () {
        contador++;
        let newElem = $(`<li>Elemento ${contador}</li>`);
        $("#listaElementos").append(newElem);
    });

    // Mostrar y ocultar completamente
    $("#superficie").fadeIn(2000).fadeOut(2000);
    // Mostrar y ocultar hasta el 50% de opaciodad
    $("#superficie").fadeIn(2000).fadeTo(2000, 0.5);
    // Deslizamiento hacia abajo
    $("#superficie").slideDown(2000);
    // Deslizamiento hacia hacia arriba
    $("#superficie").fadeIn(2000).slideUp(2000);

    $("#listaElementos").on("click", " tr ", function (event) {
        // event.target contiene un elemento del DOM
        // Construir una selección a partir de él:
        let elementoPulsado = $(event.target);
        // También valdría elementoPulsado = $(this)
        // Mostrar mensaje con el contenido del <li>:
        alert("Has hecho clic en " + elementoPulsado.text());
    });


    let selector = "div";
    let m = [
        ["Esto", "es", "una fila"],
        ["aquí", "va", "otra fila"],
        ["y", "aquí", "otra más"]
    ];
    let callback = mostrarAviso;

    insertMatrix(selector, m);
    insertMatrix2(selector, m, callback);


});

function mostrarAviso(event) {
    let elementoPulsado = $(event.target);
    alert("Has hecho clic en " + elementoPulsado.text());
}

function insertMatrix(selector, matriz) {
    // Preparamos la tabla
    let newElem = $("<table></table>");
    matriz.forEach(element => {
        let fila = $("<tr></tr>");
        element.forEach(dato => {
            let celda = $("<td></td>");
            celda.text(dato);
            fila.append(celda);
        });
        newElem.append(fila);
    });

    // la añadimos al selector
    $(selector).append(newElem);
}

function insertMatrix2(selector, matriz, callback) {
    // Preparamos la tabla
    let newElem = $(`<table></table>`);
    matriz.forEach(element => {
        let fila = $(`<tr></tr>`);
        element.forEach(dato => {
            let celda = $(`<td></td>`);
            celda.text(dato);
            fila.append(celda);
        });
        newElem.append(fila);
    });

    // la añadimos al selector
    $(selector).append(newElem);

    // Añadimos el callback
    $("table").on("click", " td ",callback);
}

// function mostrar() {
//     $(".mostrar").show();
// }

// function ocultar() {
//     $(".mostrar").hide();
// }

// function mostrarPosicion(event) {
//     $(".mostrar").text(event.pageX + "x" + event.pageY);
// }

// function mostrarTeclaPulsada(event) {
//     if (event.ctrlKey) {
//         $(".teclaControl").addClass("fondoRosa")
//     } else if(event.altKey) {
//         $(".teclaAlt").addClass("fondoRosa")
//     }else if(event.shiftKey){
//         $(".teclaShift").addClass("fondoRosa")
//     }
// }

// function limpiarTeclaPulsada(event) {
//     $(".teclaControl").removeClass("fondoRosa")
//     $(".teclaAlt").removeClass("fondoRosa")
//     $(".teclaShift").removeClass("fondoRosa")
// }

// $(function () {
//     $(".captura").on("mouseenter", mostrar);
//     $(".captura").on("mouseleave", ocultar);
//     $(".mostrar").hide();
//     $(".captura").on("mousemove", mostrarPosicion);
//     $(document).on("keydown",mostrarTeclaPulsada)  
//     $(document).on("keyup",limpiarTeclaPulsada)  
// })



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