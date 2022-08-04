import Casilla from "./Casilla.js";
import Jugador from "./Jugador.js";

export default class Constructora {
  static construirCasillas() {
    return construirObjetosCasillas(extraerCasillas());

    function extraerCasillas() {
      var corners = document.getElementsByClassName("corner");
      var hBottomRow = invertirNodeList(
        document
          .getElementsByClassName("bottom-row")[0]
          .getElementsByClassName("space")
      );
      var vLeftRow = invertirNodeList(
        document
          .getElementsByClassName("left-row")[0]
          .getElementsByClassName("space")
      );
      var hTopRow = document
        .getElementsByClassName("top-row")[0]
        .getElementsByClassName("space");
      var vRightRow = document
        .getElementsByClassName("right-row")[0]
        .getElementsByClassName("space");

      var casillasOrdenadas = [];

      casillasOrdenadas.push(corners[0]);
      hBottomRow.forEach((e) => casillasOrdenadas.push(e));
      casillasOrdenadas.push(corners[1]);
      vLeftRow.forEach((e) => casillasOrdenadas.push(e));
      casillasOrdenadas.push(corners[2]);
      [...hTopRow].forEach((e) => casillasOrdenadas.push(e));
      casillasOrdenadas.push(corners[3]);
      [...vRightRow].forEach((e) => casillasOrdenadas.push(e));

      return casillasOrdenadas;
    }

    function invertirNodeList(nodeList) {
      return [...nodeList].reverse();
    }

    function construirObjetosCasillas(arr) {
      let objetos = [];

      arr.forEach((e) => objetos.push(new Casilla(e)));

      return objetos;
    }
  }

  static construirJugadores() {
    let tarjetas = document.getElementsByClassName("tarjeta");
    let jugadores = [];

    for (let i = 0; i < tarjetas.length; i++) {
      let jugador = new Jugador(tarjetas[i]);
      jugadores.push(jugador);
    }

    return jugadores;
  }
}
