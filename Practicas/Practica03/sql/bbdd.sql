

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT
= 0;
START TRANSACTION;
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tareas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tag`
--

CREATE TABLE `tag`
(
  `taskId` int
(11) NOT NULL,
  `tag` varchar
(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `task`
--

CREATE TABLE `task`
(
  `id` int
(11) NOT NULL,
  `user` varchar
(100) NOT NULL,
  `text` text NOT NULL,
  `done` tinyint
(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user`
(
  `email` varchar
(100) NOT NULL,
  `password` varchar
(100) NOT NULL,
  `img` varchar
(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tag`
--
ALTER TABLE `tag`
ADD PRIMARY KEY
(`taskId`,`tag`);

--
-- Indices de la tabla `task`
--
ALTER TABLE `task`
ADD PRIMARY KEY
(`id`),
ADD KEY `user`
(`user`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
ADD PRIMARY KEY
(`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `task`
--
ALTER TABLE `task`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tag`
--
ALTER TABLE `tag`
ADD CONSTRAINT `tag_ibfk_1` FOREIGN KEY
(`taskId`) REFERENCES `task`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE;

--
-- Filtros para la tabla `task`
--
ALTER TABLE `task`
ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY
(`user`) REFERENCES `user`
(`email`) ON
DELETE CASCADE ON
UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



-- Insertamos usuario de prueba 
INSERT INTO `user` (`email`, `password`, `img`) VALUES ('usuario@ucm.es', 'mipass', 'img/pepe.png');

--Insertamos tareas de prueba
INSERT INTO `task` (`id`, `user`, `text`, `done`) VALUES ('1', 'usuario@ucm.es', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie a iaculis at. Aliquam ultrices sagittis orci a scelerisque purus semper eget duis. Tristique senectus et netus et malesuada fames ac turpis. A arcu cursus vitae congue mauris rhoncus aenean. Egestas purus viverra accumsan in nisl nisi scelerisque eu. Turpis cursus in hac habitasse platea. Dolor sit amet consectetur adipiscing elit. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Blandit aliquam etiam erat velit scelerisque in. Id consectetur purus ut faucibus pulvinar elementum integer enim. Urna duis convallis convallis tellus. ', '0'), 
('2', 'usuario@ucm.es', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie a iaculis at. Aliquam ultrices sagittis orci a scelerisque purus semper eget duis. Tristique senectus et netus et malesuada fames ac turpis. A arcu cursus vitae congue mauris rhoncus aenean. Egestas purus viverra accumsan in nisl nisi scelerisque eu. Turpis cursus in hac habitasse platea. Dolor sit amet consectetur adipiscing elit. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Blandit aliquam etiam erat velit scelerisque in. Id consectetur purus ut faucibus pulvinar elementum integer enim. Urna duis convallis convallis tellus. ', '1') 


--Insertamos tags de prueba
INSERT INTO `tag` (`taskId`, `tag`) VALUES ('1', '12'), ('1', '13'), ('1', '22'), ('1', '23');