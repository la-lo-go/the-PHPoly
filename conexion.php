<?php

    $host = "localhost";
    $user = "root";
    $pass = "";
    $db = "thephpoly";
    $tableJugadores = "jugadores";
    $tableTablero = "tablero";

    // Fuerza a SQL a tirar excepciones
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); 

    // Prueba a conectarse
    try {
        $conexion = mysqli_connect($host, $user, $pass);
        mysqli_set_charset($conexion, "utf8");
    } catch (Exception $e) {
        echo($e);
        exit();
    }

?>