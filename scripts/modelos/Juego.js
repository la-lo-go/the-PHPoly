import Constructora from "./Constructora.js";

export default class Juego {
  constructor() {
    this.casillas = Constructora.construirCasillas();
    this.jugadores = Constructora.construirJugadores();
    this.ronda = 0;
    this.botones = $(".botones");
    this.jugadoresMuertos = [];

    this.#initialize();

    console.log("Casillas:", this.casillas);
    console.log("Jugadores:", this.jugadores);
    console.log("🚀 Juego listo para empezar 🚀");
  }

  /**
   * Coloca a todos los jugadores en sus posiciones guardadas
   */
  #initialize() {
    let casillas = this.casillas;
    let jugadores = this.jugadores;
    var jugadorI;
    var casillaI;

    for (let i = 0; i < jugadores.length; i++) {
      jugadorI = jugadores[i];
      casillaI = casillas[jugadorI.posicion];
      casillaI.historial.push(jugadorI.color);
      casillas[jugadorI.posicion].div.style.backgroundColor = jugadorI.color;
    }

    casillas[jugadores[0].posicion].div.style.boxShadow =
      "inset 0em 0em 0em 0.4em #ffffff95";
    casillas[jugadores[0].posicion].div.style.backgroundColor =
      jugadores[0].color;
  }

  /** Despues de tirar el dado se ejecuta
   * 
   * @param {Juego} juego Partida actual
   * @param {Number} n numero del dado que ha salido
   */
  static SiguienteTurno(juego, n) {
    console.log(`Dado: ${n}`);

    let _jugadores = juego.jugadores;
    var casilla;

    var jugadorActual = _jugadores[juego.ronda % 4];

    // Comprobar si el jugador está vivo
    if (juego.jugadoresMuertos.length < 3) {
      if (jugadorActual.vivo) { // Si esta vivo se juega
        jugadorVivo(Juego, mostrarBtns);
      } else { // Si no lo esta se comprueba si esta almacenado
        if(juego.jugadoresMuertos.indexOf(jugadorActual) == -1) {
          juego.jugadoresMuertos.push(jugadorActual);
        }
        Juego.pasar(juego);
        Juego.SiguienteTurno(juego, n);
      }
    } else { // Si ya hay 3 muertos se acaba el juego
      acabarJuego(_jugadores);
    }

    /**
     * Se muestran los botones de compra y se oculta el dado
     */
    function mostrarBtns() {
      var dice = $(".title");

      juego.mostrar(juego.botones);
      juego.ocultar(dice);
    }

    /**
     * Si el jugador esta vivo se ve donde cae
     */
    function jugadorVivo(Juego, mostrarBtns) {
      casilla = Juego.moverFicha(juego, jugadorActual, n);

      switch (casilla.tipo) {
        case "property": // Casilla normal
          if (casilla.propietario == null) {
            if(jugadorActual.dinero > casilla.coste) {  // Si tiene dinero para comprar
              mostrarBtns();
             } else {
              juego.cambiarMensaje(`${jugadorActual.nombre} no tiene dinero suficiente para comprar ${casilla.nombre}`);
              Juego.pasar(juego)
             }
          } else { // Si la casilla tiene propietario
            if(casilla.propietario != jugadorActual) { // Si el propietario no es el propio jugador
              jugadorActual.pagarAlquiler(casilla);
              juego.cambiarMensaje(
                `${jugadorActual.nombre} ha pagado alquiler a ${casilla.propietario.nombre}`
              );
            } else {
              Juego.pasar(juego);
            }
          }
          break;

        // Cae en los impuestos
        case "fee luxury-tax":
        case "fee income-tax":
          jugadorActual.pagarImpuesto(casilla);
          juego.cambiarMensaje(
            `${jugadorActual.nombre} ha pagado los impuestos`
          );
          Juego.pasar(juego);
          break;

        default:
          Juego.pasar(juego);
          break;
      }
    }

    /** Solo queda un jugador que se muestra por pantalla
     * y se oculatan el dado y los botones
     * 
     * @param {Jugador[]} jugadores
     */
    function acabarJuego(jugadores) {
      let mensajeDiv = $("#mensaje");

      let jugadorVivo = jugadores.filter(e => e.vivo)[0]

      juego.ocultar($(".title")); // ocultar el dado

      mensajeDiv.css("grid-row", "4"); // Centrar en tablero
      mensajeDiv.html(`🎉 ${jugadorVivo.nombre} ha ganado el juego 🎉`);
      mensajeDiv.css("visibility", "visible");
      mensajeDiv.css("opacity", "1");
    }
  }

  /**
   * 
   * @param {Juego} juego Partida actual
   * @param {Juegado} jugadorActual Jugador de ese turno
   * @param {Number} n numero del dado
   * @returns {Casilla} Casilla en la acaba el jugadorActual
   */
  static moverFicha(juego, jugadorActual, n) {
    let casillaAnterior = juego.casillas[jugadorActual.posicion];
    let historial = casillaAnterior.historial;
    let casillaObjetivo;
    var posicionAnterior;

    // eliminar el rastro de su anterior tirada
    historial.splice(historial.indexOf(jugadorActual.color), 1); // Elimina el color del historial
    if (historial.length == 0) {
      // Si no hay nada mas en esa posicion
      casillaAnterior.div.style.backgroundColor = "#f0f0f0";
    } else {
      // Si en esa casilla quedan jugadores
      casillaAnterior.div.style.backgroundColor =
        historial[historial.length - 1];
    }

    if (casillaAnterior.propietario == null) {
      casillaAnterior.div.style.boxShadow = "none";
    } else {
      casillaAnterior.div.style.boxShadow =
        "inset 0em 0em 0em 0.4em " + casillaAnterior.propietario.color;
    }

    // sumar el dado al jugador actual
    posicionAnterior = jugadorActual.posicion;
    jugadorActual.posicion = (posicionAnterior + n) % 40;
    casillaObjetivo = juego.casillas[jugadorActual.posicion];
    console.log("Posicion jugador:", jugadorActual.posicion);

    // actualizar el color de la casilla donde ha caido
    casillaObjetivo.div.style.backgroundColor = jugadorActual.color;
    casillaObjetivo.div.style.boxShadow = "inset 0em 0em 0em 0.4em #ffffff95";
    casillaObjetivo.historial.push(jugadorActual.color);

    // Comprobar si se ha dado una vuelta
    if (posicionAnterior > jugadorActual.posicion) {
      jugadorActual.vuelta();
    }

    return casillaObjetivo;
  }

  /** El jugador compra una propiedad
   * 
   * @param {Juego} juego partida actual
   */
  static comprar(juego) {
    let jugadorComprador = juego.jugadores[juego.ronda % 4];
    let casillaComprada = juego.casillas[jugadorComprador.posicion];

    jugadorComprador.comprar(casillaComprada);

    juego.cambiarMensaje(
      `${jugadorComprador.nombre} ha comprado ${casillaComprada.nombre}`
    );
    Juego.pasar(juego);
  }

  static pasar(juego) {
    let jugadorActual = juego.jugadores[juego.ronda % 4];
    let jugadorSiguiente = juego.jugadores[(juego.ronda + 1) % 4];

    Juego.pasarAlSiguiente(juego, jugadorActual, jugadorSiguiente);
  }

  /** Se pasa al siguiente ugador eliminando el rastro del actual
   * 
   * @param {Juego} juego partida actual
   * @param {Jugador} jugadorActual jugador de ese turno
   * @param {Jugador} jugadorSiguiente jugador del siguiente turno
   */
  static pasarAlSiguiente(juego, jugadorActual, jugadorSiguiente) {
    var borde = "inset 0em 0em 0em 0.4em #ffffff95";
    var dice = $(".title");
    var botones = $(".botones");

    //Limpiar jugador actual
    jugadorActual.div.style.boxShadow = "none";
    juego.casillas[jugadorActual.posicion].div.style.boxShadow = "none";
    
    // preparar el siguiente
    jugadorSiguiente.div.style.boxShadow = borde;
    juego.casillas[jugadorSiguiente.posicion].div.style.backgroundColor =
      jugadorSiguiente.color;
    juego.casillas[jugadorSiguiente.posicion].div.style.boxShadow = borde;

    // Si los botones de compra estan visibles se quitan
    if (botones.css("visibility") == "visible") {
      juego.mostrar(dice);
      juego.ocultar(botones);
    }

    juego.ronda++;
  }

  mostrar(div) {
    div.css("visibility", "visible");
    div.css("opacity", "1");
  }

  ocultar(div) {
    div.css("opacity", "0");
    div.css("visibility", "hidden");
  }

  cambiarMensaje(msg) {
    let mensajeDiv = $("#mensaje");

    mensajeDiv.html(msg);
    this.mostrar(mensajeDiv);

    // ocultar despues de 3 segundos
    setTimeout(() => {
      this.ocultar(mensajeDiv);
    }, 3000);
  }
}
