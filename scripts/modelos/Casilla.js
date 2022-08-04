export default class Casilla {
  constructor(div) {
    this.div = div;
    this.tipo = this.#getTipo();
    this.nombre = this.#getNombre();
    this.color = this.#getColor();
    this.coste = this.#getCoste();
    this.propietario = null;
    this.historial = [];
  }

  #getNombre() {
    if(this.tipo == "property"){
      return this.div.getElementsByClassName("name")[0].textContent;
    }else
      return null;
  }

  #getTipo() {
    return this.div.getAttribute("class").replace("space ", "");
  }

  /** Consigue el color de la casilla
   * 
   * @returns {string} El tipo color de la propiedad, si no devuelve null
   */
  #getColor() {
    if(this.tipo == "property")
      return window.getComputedStyle(this.div, null).getPropertyValue('background-color');
    else
      return null;
  }

  /** Consigue el precio de la casilla
   * 
   * @returns {number} El precio de la propiedad, si no devuelve null
   */
  #getCoste() {
    var coste = null;

    if(this.tipo == "property")
      coste = parseInt(this.div.getElementsByClassName("price")[0].innerHTML.split("₱")[1]);
    else if(this.tipo.includes("fee")){
      coste = parseInt(this.div.getElementsByClassName("instructions")[0].innerHTML.split("₱")[1]);      
    }
    
    return coste;
  }  
}
