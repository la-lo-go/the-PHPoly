<?php 
    require('./conexion.php');
    const COLORES_TARJETAS = array("morado", "rosa", "amarillo", "verde");

    mysqli_select_db($conexion, $db) or die ("No se encuentra la base de datos");

    $consulta = "SELECT * FROM `$tableJugadores`";
    $result = $conexion->query($consulta);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/index/style_index.css" media="all" />
    <link rel="stylesheet" href="./styles/general/style_general.css" media="all" />
    <link rel="stylesheet" href="./styles/dice/style_dice.css" media="all" />
    <link rel="stylesheet" href="./styles/normalize.css" media="all" />
    <script src="https://code.jquery.com/jquery-3.6.0.slim.js"
        integrity="sha256-HwWONEZrpuoh951cQD1ov2HUK5zA5DwJ1DNUXaM6FsY=" crossorigin="anonymous"></script>
    <link rel="shortcut icon" href="./static/favicon.png" type="image/x-icon">
    <script type="module" src="./scripts/tablero.js"></script>
    <title>the PHPoly</title>
</head>

<body>
    <header>
        <div class="btn-reinicio">
            <a href="reinicio.html" title="Reinicio">
                <input type="button" value="ㅤ" id="reinicio"/>
            </a>
        </div>
        <div id="logo">the PHPoly</div>
    </header>
        
<!-- https://grid.layoutit.com/?id=tmhlQFY -->
<div class="container">
    <div class="tarjetas">
        <?php
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo(crearTarjeta(COLORES_TARJETAS[$row["id"]-1], $row["icono"], $row["nombre"], $row["dinero"], $row["posicion"], $row["vivo"]));
                }            
            }
        ?>
    </div>
    
    <div class="tablero">
        <div class="table">
            <div class="board">
                <div class="center">
                    <div id="mensaje">
                        Este es un texto de ejemplo que cambia para mostrar actualizaciones el juego
                        [NO SE MUESTRA POR DEFECTO]
                    </div>
                    <div class="title">
                        <div id="dice" data-side="1">
                            <!-- Cara 1 -->
                            <div class="sides side-1">
                                <span class="dot dot-1"></span>
                            </div>
                            
                            <!-- Cara 2 -->
                            <div class="sides side-2">
                                <span class="dot dot-1"></span>
                                <span class="dot dot-2"></span>
                            </div>
                    
                            <!-- Cara 3 -->
                            <div class="sides side-3">
                                <span class="dot dot-1"></span>
                                <span class="dot dot-2"></span>  
                                <span class="dot dot-3"></span>
                            </div>
                    
                            <!-- Cara 4 -->
                            <div class="sides side-4">
                                <span class="dot dot-1"></span>
                                <span class="dot dot-2"></span>  
                                <span class="dot dot-3"></span>
                                <span class="dot dot-4"></span>
                            </div>
                    
                            <!-- Cara 5 -->
                            <div class="sides side-5">
                                <span class="dot dot-1"></span>
                                <span class="dot dot-2"></span>  
                                <span class="dot dot-3"></span>
                                <span class="dot dot-4"></span>
                                <span class="dot dot-5"></span>
                            </div>
                    
                            <!-- Cara 6 -->
                            <div class="sides side-6">
                                <span class="dot dot-1"></span>
                                <span class="dot dot-2"></span>  
                                <span class="dot dot-3"></span>
                                <span class="dot dot-4"></span>
                                <span class="dot dot-5"></span>
                                <span class="dot dot-6"></span>
                            </div>
                        </div>
                        <div id="dice-output" hidden></div>
                        <script src="./scripts/rooldice.js"></script>
                    </div>
                    <div class="botones">
                        <input type="button" value="ㅤ" id="comprar" name="comprar">
                        <input type="button" value="ㅤ" id="pasar" name="pasar">
                    </div>
                </div>
        
                <div class="space corner go">
                    <div class="container">
                        <div class="instructions">Toma 200.00₱ de regalo</div>
                        <div class="go-word">go</div>
                    </div>
                    <div class="arrow fa fa-long-arrow-left"></div>
                </div>
        
                <div class="row horizontal-row bottom-row">
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar light-blue"></div>
                            <div class="name">Gabe <br> Lewis</div>
                            <div class="price">PRICE ₱120</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar light-blue"></div>
                            <div class="name">Roy Anderson</div>
                            <div class="price">₱100</div>
                        </div>
                    </div>
                    <div class="space chance">
                        <div class="container">
                            <div class="name">Suerte</div>
                            <i class="drawing fa fa-question"></i>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar light-blue"></div>
                            <div class="name">Tobey Flenderson</div>
                            <div class="price">₱100</div>
                        </div>
                    </div>
                    <div class="space railroad">
                        <div class="container">
                            <div class="name">Sucursal Buffalo</div>
                            <i class="drawing fa fa-subway"></i>
                            <div class="price">₱200</div>
                        </div>
                    </div>
                    <div class="space fee income-tax">
                        <div class="container">
                            <div class="name">Impuestos</div>
                            <div class="diamond"></div>
                            <div class="instructions">₱25</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar brown"></div>
                            <div class="name">Todd Packer</div>
                            <div class="price">₱50</div>
                        </div>
                    </div>
                    <div class="space community-chest">
                        <div class="container">
                            <div class="name">Comite de fiestas</div>
                            <i class="drawing fa fa-cube"></i>
                            <div class="instructions">Hazle caso a la tarjeta</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar brown"></div>
                            <div class="name">Charles Miner</div>
                            <div class="price">₱50</div>
                        </div>
                    </div>
                </div>
        
                <div class="space corner jail">
                    <div class="just">Sólo</div>
                    <div class="drawing">
                        <div class="container">
                            <div class="name">En la</div>
                            <div class="window">
                                <div class="bar"></div>
                                <div class="bar"></div>
                                <div class="bar"></div>
                                <i class="person fa fa-frown-o"></i>
                            </div>
                            <div class="name">Cárcel</div>
                        </div>
                    </div>
                    <div class="visiting">Visitando</div>
                </div>
        
                <div class="row vertical-row left-row">
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar orange"></div>
                            <div class="name">Andy Bernard</div>
                            <div class="price">₱200</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar orange"></div>
                            <div class="name">Darryl Philbin</div>
                            <div class="price">₱180</div>
                        </div>
                    </div>
                    <div class="space community-chest">
                        <div class="container">
                            <div class="name">Comite de fiestas</div>
                            <i class="drawing fa fa-cube"></i>
                            <div class="instructions">Hazle caso a la tarjeta</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar orange"></div>
                            <div class="name">Creed Branton</div>
                            <div class="price">₱180</div>
                        </div>
                    </div>
                    <div class="space railroad">
                        <div class="container">
                            <div class="name">Sucursal Siracusa</div>
                            <i class="drawing fa fa-subway"></i>
                            <div class="price">₱200</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar purple"></div>
                            <div class="name">Ryan Howard</div>
                            <div class="price">₱160</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar purple"></div>
                            <div class="name">Kelly Kapoor</div>
                            <div class="price">₱140</div>
                        </div>
                    </div>
                    <div class="space utility electric-company">
                        <div class="container">
                            <div class="name">Dunder Mifflin</div>
                            <i class="drawing fa fa-lightbulb-o"></i>
                            <div class="price">₱150</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar purple"></div>
                            <div class="name">Jan Leviston</div>
                            <div class="price">₱140</div>
                        </div>
                    </div>
                </div>
        
                <div class="space corner free-parking">
                    <div class="container">
                        <div class="name">¡Parking</div>
                        <i class="drawing fa fa-car"></i>
                        <div class="name">Gratis!</div>
                    </div>
                </div>
        
                <div class="row horizontal-row top-row">
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar red"></div>
                            <div class="name">Meredith Palmer</div>
                            <div class="price">₱220</div>
                        </div>
                    </div>
                    <div class="space chance">
                        <div class="container">
                            <div class="name">Suerte</div>
                            <i class="drawing fa fa-question blue"></i>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar red"></div>
                            <div class="name">Holly</br> Flax</div>
                            <div class="price">₱220</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar red"></div>
                            <div class="name">Angela Martin</div>
                            <div class="price">₱200</div>
                        </div>
                    </div>
                    <div class="space railroad">
                        <div class="container">
                            <div class="name">Sucursal Scranton</div>
                            <i class="drawing fa fa-subway"></i>
                            <div class="price">₱200</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar yellow"></div>
                            <div class="name">Atlantic Avenue</div>
                            <div class="price">₱260</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar yellow"></div>
                            <div class="name">Phyllis Vance</div>
                            <div class="price">₱260</div>
                        </div>
                    </div>
                    <div class="space utility waterworks">
                        <div class="container">
                            <div class="name">Saber</div>
                            <i class="drawing fa fa-tint"></i>
                            <div class="price">₱120</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar yellow"></div>
                            <div class="name">Kevin Malone</div>
                            <div class="price">₱280</div>
                        </div>
                    </div>
                </div>
        
                <div class="space corner go-to-jail">
                    <div class="container">
                        <div class="name">A la</div>
                        <i class="drawing fa fa-gavel"></i>
                        <div class="name">Carcel</div>
                    </div>
                </div>
        
                <div class="row vertical-row right-row">
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar green"></div>
                            <div class="name">Stanley Hudson</div>
                            <div class="price">₱300</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar green"></div>
                            <div class="name">Michael Scoot</div>
                            <div class="price">₱300</div>
                        </div>
                    </div>
                    <div class="space community-chest">
                        <div class="container">
                            <div class="name">Comite de fiestas</div>
                            <i class="drawing fa fa-cube"></i>
                            <div class="instructions">Hazle caso a la tarjeta</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar green"></div>
                            <div class="name">Dwight Schrute</div>
                            <div class="price">₱320</div>
                        </div>
                    </div>
                    <div class="space railroad">
                        <div class="container">
                            <div class="name">Sucursal Nashua</div>
                            <i class="drawing fa fa-subway"></i>
                            <div class="price">₱200</div>
                        </div>
                    </div>
                    <div class="space chance">
                        <div class="container">
                            <div class="name">Suerte</div>
                            <i class="drawing fa fa-question"></i>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar dark-blue"></div>
                            <div class="name">Pam Beasly</div>
                            <div class="price">₱350</div>
                        </div>
                    </div>
                    <div class="space fee luxury-tax">
                        <div class="container">
                            <div class="name">Impuesto de lujo</div>
                            <div class="drawing fa fa-diamond"></div>
                            <div class="instructions">₱75</div>
                        </div>
                    </div>
                    <div class="space property">
                        <div class="container">
                            <div class="color-bar dark-blue"></div>
                            <div class="name">Jim Halpert</div>
                            <div class="price">₱400</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>

<?php
    function crearTarjeta($color, $icono, $nombre, $dinero, $posicion, $vivo){
        $tarjeta = '<div class="tarjeta '.$color.'">
                        <div class="foto"><img src="./static/iconos/'.$icono.'.png" alt="'.$icono.'"></div>
                        <div class="datos-jugador">
                            <div class="nombre">'.$nombre.'</div>
                            <div class="dinero">'.$dinero.' ₱</div>
                            <div class="propiedades">Propiedades:</div>
                            <div class="propiedades-cantidad">0</div>
                            <div class="posicion" hidden>'.$posicion.'</div>
                            <div class="vivo" hidden>'.$vivo.'</div>
                        </div>
                    </div>';

        return $tarjeta;
    }
?>