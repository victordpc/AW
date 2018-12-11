"use strict";
function anyadirElemento() {
    let nuevoElemento = $("<input type=\"text\" >");
    $("#listaNumerada").append(nuevoElemento);
}

$(function () {
    $(() => {
        $("#anyadirElemento").on("click", anyadirElemento);
    });
            $("#email").on("change", function () {
                // Obtenemos valor actual
                let valor = $(event.target).prop("value").trim();
                if (valor === "") {
                    $("#mensaje").text("El campo está vacío");
                }else {
                    $("#mensaje").text("");
                }
            });

            $("#pass").on("change", function () {
                // Obtenemos valor actual
                let valor = $(event.target).prop("value").trim();
                if (valor === "") {
                    $("#mensaje").text("El campo está vacío");
                }else {
                    $("#mensaje").text("");
                }
            });
        }