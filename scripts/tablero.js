import Juego from "./modelos/Juego.js";

$(document).ready(function () {
  let juego = new Juego();

  let border = "0em 0em 0em 0.5em #ffffff95";

  document.getElementsByClassName("tarjeta")[0].style.boxShadow = border;

  let output = document.querySelector("#dice-output");

  var observer = new MutationObserver(function (mutations) {
    Juego.SiguienteTurno(juego, parseInt(output.innerText));
  });

  // Configuracion del observer
  observer.observe(output, {
    childList: true,
  });

  $("#comprar").click(function () {
    Juego.comprar(juego);
  });
  
  $("#pasar").click(function () {
    Juego.pasar(juego);
  });
});

