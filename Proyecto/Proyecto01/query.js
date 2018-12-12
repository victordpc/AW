"use strict";
function anyadirElemento() {
   let nuevoElemento = $("<li><input type=\"text\" > </li>");
  //  let nuevoElemento = $("<li>Nuevo elemento</li>");
    $("#listaRespuestas").append(nuevoElemento);
}

$(function () {
    $("#anyadirElemento").on("click", anyadirElemento);
    
});