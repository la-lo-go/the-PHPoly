export default class Jugador {
  constructor(div) {
    this.div = div;
    this.nombre = div.getElementsByClassName("nombre")[0].innerHTML;
    this.divDinero = div.getElementsByClassName("dinero")[0];
    this.dinero = Number.parseInt(this.divDinero.innerHTML.split(" ₱")[0]);
    this.posicion = Number.parseInt(
      div.getElementsByClassName("posicion")[0].innerHTML
    );
    this.color = window
      .getComputedStyle(div, null)
      .getPropertyValue("background-color");
    this.propiedades = [];
    this.propiedadesCantidad = div.getElementsByClassName(
      "propiedades-cantidad"
    )[0];
    this.vivo = this.#getVivo();
  }

  #getVivo() {
    console.log(this.div.getElementsByClassName("vivo")[0].innerHTML);

    if(Number.parseInt(this.div.getElementsByClassName("vivo")[0].innerHTML) === 1){
      return true;
    }else{
      this.#transferencia(-(this.dinero+1));
      return false;
    }
  }

  // METODOS
  comprar(propiedad) {
    this.#transferencia(-propiedad.coste);
    this.propiedades.push(propiedad);
    propiedad.div.style.boxShadow = "inset 0em 0em 0em 0.4em" + this.color;
    propiedad.propietario = this;
    this.propiedadesCantidad.innerHTML = this.propiedades.length;
  }

  /** Se paga el alquiler al propietario de la casilla
   *
   * @param {Casilla} casilla de la que se paga
   */
  pagarAlquiler(casilla) {
    let cantidad = Math.floor(casilla.coste / 3);

    casilla.propietario.cobrarAlquiler(cantidad);
    this.#transferencia(-cantidad);
  }

  /** Un jugador te da dinero
   *
   * @param {number} cantidad de dinero que se consigue
   */
  cobrarAlquiler(cantidad) {
    this.#transferencia(cantidad);
  }

  /** Paga impuestos para subvencionar el servidor
   *
   * @param {Casilla} Casilla afin a Hacienda
   */
  pagarImpuesto(casilla) {
    this.#transferencia(-casilla.coste);
  }

  vuelta() {
    this.#transferencia(200);
  }

  /** Paga o recibe dinero y lo muestra en el div
   *
   * @param {Integer} cantidad de dinero a restar/sumar
   */
  #transferencia(cantidad) {
    // El primero es verde, el otro rojo
    let color = cantidad > 0 ? "#6eda3c" : "#e73737";

    // Suma-Resta el dinero
    this.dinero += cantidad;

    if (this.dinero > 0) {
      this.divDinero.style.color = color;
      if (cantidad > 0) {
        this.divDinero.innerHTML = `+${cantidad} ₱`;
      } else {
        this.divDinero.innerHTML = `${cantidad} ₱`;
      }
      this.divDinero.style.fontSize = "1.5em";

      setTimeout(() => {
        this.divDinero.style.color = "white";
        this.divDinero.innerHTML = `${this.dinero} ₱`;
        this.div.style.boxShadow = "none";
        this.divDinero.style.fontSize = "1em";
      }, 3000);
    } else {
      bancarrota(this);
    }

    /**
     * Todas las propiedades se devuelven a la banca
     * y el jugador se bloquea
     */
    function bancarrota(jugador) {

      // Devolver propiedades
      jugador.propiedades.forEach(function (e) {
        e.propietario = null;
        e.div.style.boxShadow = "none";
      });

      // Bloquear jugador
      jugador.vivo = false;
      jugador.div.style.backgroundColor = "#9E9E9E";
      jugador.divDinero.innerHTML = "0";
      jugador.propiedadesCantidad.innerHTML = "0";


      mostrarMensaje(jugador.nombre);

      function mostrarMensaje(nombre) {
        let mensajeDiv = $("#mensaje");
        mensajeDiv.html(`El jugador ${nombre} ha caido en bancarrota 😭`);
        mensajeDiv.css("visibility", "visible");
        mensajeDiv.css("opacity", "1");
        setTimeout(() => {
          mensajeDiv.css("opacity", "0");
          mensajeDiv.css("visibility", "hidden");
        }, 5000);
      }
    }
  }
}
