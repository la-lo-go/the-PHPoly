/**
 * Utility class for managing game state persistence using localStorage
 */
export default class GameStorage {
  static STORAGE_KEY = 'thePHPoly_gameState';

  /**
   * Save current game state to localStorage
   * @param {Juego} juego - Current game instance
   */
  static saveGameState(juego) {
    try {
      const gameState = {
        ronda: juego.ronda,
        jugadoresMuertos: juego.jugadoresMuertos.map(jugador => juego.jugadores.indexOf(jugador)),
        jugadores: juego.jugadores.map(jugador => ({
          nombre: jugador.nombre,
          dinero: jugador.dinero,
          posicion: jugador.posicion,
          vivo: jugador.vivo,
          propiedades: jugador.propiedades.map(prop => juego.casillas.indexOf(prop))
        })),
        casillas: juego.casillas.map(casilla => ({
          propietario: casilla.propietario ? juego.jugadores.indexOf(casilla.propietario) : null
        })),
        timestamp: Date.now()
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(gameState));
      console.log('Game state saved to localStorage');
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }

  /**
   * Load game state from localStorage
   * @returns {Object|null} - Saved game state or null if not found
   */
  static loadGameState() {
    try {
      const savedState = localStorage.getItem(this.STORAGE_KEY);
      if (savedState) {
        const gameState = JSON.parse(savedState);
        console.log('Game state loaded from localStorage');
        return gameState;
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
    return null;
  }

  /**
   * Clear saved game state from localStorage
   */
  static clearGameState() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('Game state cleared from localStorage');
    } catch (error) {
      console.error('Error clearing game state:', error);
    }
  }

  /**
   * Check if there's a saved game state
   * @returns {boolean}
   */
  static hasSavedState() {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }

  /**
   * Restore game state to the game instance
   * @param {Juego} juego - Game instance to restore state to
   * @param {Object} gameState - Saved game state
   */
  static restoreGameState(juego, gameState) {
    try {
      // Restore round
      juego.ronda = gameState.ronda || 0;

      // Restore dead players list
      if (gameState.jugadoresMuertos) {
        juego.jugadoresMuertos = gameState.jugadoresMuertos.map(index => juego.jugadores[index]).filter(Boolean);
      }

      // Clear existing visual state before restoration
      juego.casillas.forEach(casilla => {
        casilla.historial = [];
        casilla.div.style.backgroundColor = "#f0f0f0";
        casilla.div.style.boxShadow = "none";
        casilla.propietario = null;
      });

      // Clear player properties arrays
      juego.jugadores.forEach(jugador => {
        jugador.propiedades = [];
      });

      // Restore player states
      gameState.jugadores.forEach((savedJugador, index) => {
        if (index < juego.jugadores.length) {
          const jugador = juego.jugadores[index];
          
          // Restore basic properties
          jugador.dinero = savedJugador.dinero;
          jugador.posicion = savedJugador.posicion;
          jugador.vivo = savedJugador.vivo;

          // Update UI
          jugador.divDinero.innerHTML = `${jugador.dinero} ₱`;
          
          // Handle dead players
          if (!jugador.vivo) {
            jugador.div.style.backgroundColor = "#9E9E9E";
            jugador.divDinero.innerHTML = "0";
            jugador.propiedadesCantidad.innerHTML = "0";
          }
        }
      });

      // Restore property ownership
      gameState.casillas.forEach((savedCasilla, index) => {
        if (index < juego.casillas.length && savedCasilla.propietario !== null) {
          const casilla = juego.casillas[index];
          const propietario = juego.jugadores[savedCasilla.propietario];
          
          casilla.propietario = propietario;
          propietario.propiedades.push(casilla);
          
          // Update visual ownership with proper spacing
          casilla.div.style.boxShadow = "inset 0em 0em 0em 0.4em " + propietario.color;
        }
      });

      // Update property counts and restore visual player positions
      juego.jugadores.forEach(jugador => {
        jugador.propiedadesCantidad.innerHTML = jugador.propiedades.length;
        
        // Update visual position on board
        const casilla = juego.casillas[jugador.posicion];
        casilla.historial.push(jugador.color);
        casilla.div.style.backgroundColor = jugador.color;
      });

      // Set current player visual state
      if (juego.jugadores.length > 0) {
        const currentPlayer = juego.jugadores[juego.ronda % 4];
        currentPlayer.div.style.boxShadow = "inset 0em 0em 0em 0.4em #ffffff95";
        juego.casillas[currentPlayer.posicion].div.style.boxShadow = "inset 0em 0em 0em 0.4em #ffffff95";
      }

      console.log('Game state restored successfully');
    } catch (error) {
      console.error('Error restoring game state:', error);
    }
  }
}