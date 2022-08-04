<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/general/style_general.css" media="all" />
    <title>Cargando tablero.....</title>
</head>
<body>
    <h1>jsajdksd</h1>
<?php

if (isset($_POST["reiniciar"])){
    echo "<h1>Cargando datos de jugadores y reiniciando tablero, espere</h1>";
    require('./conexion.php');
    
    $DINERO_INICIAL = 4000;

    try {
        $nombresJugadores = array($_POST["nombreJ1"], $_POST["nombreJ2"], $_POST["nombreJ3"], $_POST["nombreJ4"]);
        $iconosJugadores = array($_POST["foto1"], $_POST["foto2"], $_POST["foto3"], $_POST["foto4"]);
    } catch (\Throwable $th) {
        throw $th;
    }
    
    mysqli_select_db($conexion, $db) or die ("No se encuentra la base de datos");
    for($i=0; $i < count($nombresJugadores); $i++){
        $consulta = "UPDATE `$tableJugadores` SET `nombre`='$nombresJugadores[$i]', `icono`='$iconosJugadores[$i]', `dinero`='$DINERO_INICIAL', `vivo`=1, `vivo`=1, `posicion`=0  WHERE id=".$i+1;
        $result = $conexion->query($consulta);
    }

    header("Location: index.php");
} else {
    echo "<h1>No se ha recibido ningún dato</h1>";
}

?>
</body>
</html>