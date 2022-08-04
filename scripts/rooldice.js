let dice = document.getElementById("dice");
let outputDiv = document.getElementById("dice-output");

dice.addEventListener("click", rollDice);

function rollDice() {
  let numero = Math.floor(Math.random() * 6) + 1;

  // Pone el lado del resultado
  dice.dataset.side = numero;

  // Prepara la animación
  dice.classList.toggle("reRoll");

  // Pone el numero en el div despues de la animación
  setTimeout(function () {
    outputDiv.innerHTML = numero;
  }, 1500);

}

