<!-- Logo -->
<div id="content" align="center" >
<img src="docs/logo/PHpoly_Logo_Light.svg#gh-dark-mode-only" align="center" width="45%"/>
<img src="docs/logo/PHpoly_Logo_Dark.svg#gh-light-mode-only" align="center" width="45%"/>
</div>

<!-- Content -->
4 player Monopoly web game made with HTML, SASS, JavaScript (vanilla, without any framework), and PHP with inspiration from *“The Office”* series.

The players names and icons are stored in a SQL database.

You can try a **fully** functional version [here]() but note that the names of the players and their icons are set by default so, if you summit the restart form, it will probably throw an error.

## Gameplay 
![General example demostration GIF](./docs/captures/gifs/GeneralExample.gif)

Players roll a dice (hitting the 🎲 icon) and choose whether to buy the properties (🪙) or pass (➡️) and if they land on others' properties, they automatically pay rent. The game ends when only one player remains.

The game can be restarted clicking the ♻️ icon and a form will appear to enter the names and preffered icon of the players.


## UI Details
| Transaction between players  | Dice and buttons switch |
|:---:|:-----------------------:|
|<img src="./docs/captures/gifs/transaction.gif" alt="Transaction between players GIF">|<img src="./docs/captures/gifs/dice.gif" alt="Transaction between players GIF">|

**Properties purchased by the players**
![](./docs/captures/imgs/Casillas.png)

**New Player form**
![New Player form](./docs/captures/gifs/NewPlayer.gif)

## Deploy
1. Copy or clone the repository into your PHP folder
   ```bash
    git clone https://github.com/la-lo-go/the-PHPpoly
   ```
2. Import the database (the [thephpoly.sql](./thephpoly.sql) file) into your MySQL server.
3. If necessary, change the `$host`, `$user` or `$pass` values in the [conexion.php](./conexion.php) file with the keys of your database server.
4. Run the PHP and SQL server and enter to the [index.php](./index.php) page

## Documentation
<details> 
   <summary>Expand to see diagrams</summary>

   | Use cases  | Navigation flow |
   |:---:|:-----------------------:|
   |<img src="./docs/figures/casos%20de%20uso/PI_Casos de Uso.drawio.png" width="50%" alt="Use cases diagrams">|<img src="./docs/figures/Flujo navegacion/Flujo navegacion.drawio.png" alt="Navigation Flow diagram">|

   | Class diagram  | Architecture |
   |:---:|:-----------------------:|
   |<img src="./docs/figures/Diagrama clases/Diagrama de clases.drawio.png" alt="Class diagram">|<img src="./docs/figures/Arquitectura/Arquitectura.drawio.png" alt="Navigation Flow diagram">|
</details>

## Final notes
I wish this was a complete port but it is not, this was part of my first course final project so a lot of stuff that I would have liked to implement, like building and cards are not here.

So... that's it! Thanks! 🤠

## References and credits
1. [Monopoly board skeleton](https://codepen.io/johnnycopes/pen/yzQyMp) from [@johnnycopes](https://github.com/johnnycopes)
2. [3D dice with CSS](https://codepen.io/abirana/pen/rNMLrPB) from [@abirana](https://github.com/abirana)