"use strict";
function anyadirElemento() {
    contador++;
   let nuevoElemento = $(`<li><input type=\"text\" name=\"respuesta\"${contador}> </li>`);
  //  let nuevoElemento = $("<li>Nuevo elemento</li>");
    $("#listaRespuestas").append(nuevoElemento);
}

$(function () {
    let contador=4;
    $("#anyadirRespuestaPropia").on("click", function(){
        contador++;
        let nuevoElemento = $(`<li><input type=\"text\" name=\"respuesta\"${contador}> </li>`);
       //  let nuevoElemento = $("<li>Nuevo elemento</li>");
         $("#listaRespuestasDelSistema").append(nuevoElemento);
         $("#anyadirRespuestaPropia").hide();
    });

    $("#anyadirRespuesta").on("click", function(){
        contador++;
        let nuevoElemento = $(`<li><input type=\"text\" name=\"respuesta\"${contador}> </li>`);
       //  let nuevoElemento = $("<li>Nuevo elemento</li>");
         $("#listaRespuestas").append(nuevoElemento);
    });
    
});