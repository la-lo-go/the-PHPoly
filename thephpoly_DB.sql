-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2022 at 06:24 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thephpoly`
--

-- --------------------------------------------------------

--
-- Table structure for table `casillas`
--

CREATE TABLE `casillas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `color` varchar(20) NOT NULL,
  `id_jugador` int(11) NOT NULL DEFAULT 0,
  `precio_compra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jugadores`
--

CREATE TABLE `jugadores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `icono` varchar(40) NOT NULL,
  `dinero` int(11) NOT NULL DEFAULT 4000,
  `vivo` tinyint(1) NOT NULL DEFAULT 1,
  `posicion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jugadores`
--

INSERT INTO `jugadores` (`id`, `nombre`, `icono`, `dinero`, `vivo`, `posicion`) VALUES
(1, 'Player 1', 'avion', 4000, 1, 0),
(2, 'Player 2', 'pretzel', 4000, 1, 0),
(3, 'Player 3', 'taza', 4000, 1, 0),
(4, 'Player 4', 'gelatina', 4000, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `casillas`
--
ALTER TABLE `casillas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `casillas_ibfk_1` (`id_jugador`);

--
-- Indexes for table `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_casilla` (`posicion`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `casillas`
--
ALTER TABLE `casillas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `casillas`
--
ALTER TABLE `casillas`
  ADD CONSTRAINT `casillas_ibfk_1` FOREIGN KEY (`id_jugador`) REFERENCES `jugadores` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
