"use strict";

function mostrarAcceso(selector) {
    let permitido = $(selector);
    permitido.show();
    setTimeout(() => {
        permitido.hide();
    }, 1000);
}

function accesoPermitido() {
    mostrarAcceso("#permitido");
}

function accesoDenegado() {
    mostrarAcceso("#denegado");
}


$(() => {
    // Esta variable contendrá la combinación introducida hasta el momento
    let combinacionActual = "";


    $("#teclado > .numero").on("click", (evt) => {
        // Obtenemos el receptor del evento "click"
        let botonPulsado = $(evt.target);

        // --------------------------------------------
        // Completar aquí ejercicio 4
        // --------------------------------------------

        let numeroPulsado = botonPulsado.data("numero");
        combinacionActual = combinacionActual + numeroPulsado;
        $("#display").text(combinacionActual);

        if (combinacionActual.length === 4) {
            alert(`Número introducido: ${combinacionActual}`);
            
            $.ajax({
                method: "GET",
                url: "/checkPassword",
                data: { password: combinacionActual },
                success: (data, statusText, jqXHR) => {
                    // El servidor nos devuelve { valid: true } o
                    // { valid: false } en función del resultado
                    if (data.valid) {
                        accesoPermitido();
                    } else {
                        accesoDenegado();
                    }
                }
            });
            combinacionActual = "";
        }
    });

    /*
     * Manejador para borrar la combinación introducida hasta el momento
     */
    $("#teclado > .borrar").on("click", (evt) => {
        combinacionActual = "";
        $("#display").text("");
    });

});