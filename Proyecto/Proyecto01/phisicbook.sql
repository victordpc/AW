CREATE TABLE usuarios(
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  apellidos varchar(100) NOT NULL,
  password varchar(20) NOT NULL,
  fechaNac Date,
email varchar(100) NOT NULL,
  genero ENUM ('Mujer', 'Hombre','Otro') NOT NULL,
  foto BLOB,
  puntos int,
PRIMARY KEY (id),
UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE amigos(
amigo1 int NOT NULL,
amigo2 int NOT NULL,
estado ENUM ('enviada', 'aceptada') NOT NULL,
 FOREIGN KEY (amigo1) REFERENCES usuarios(id),
 FOREIGN KEY (amigo2) REFERENCES usuarios(id),
 PRIMARY KEY (amigo1,amigo2)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE preguntas(
id int(11) NOT NULL AUTO_INCREMENT,
texto VARCHAR(300) NOT NULL,
PRIMARY KEY (id),
UNIQUE (texto)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE respuestas(
id int(11) NOT NULL AUTO_INCREMENT,
idPregunta int NOT NULL,
texto VARCHAR(300) NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (idPregunta) REFERENCES preguntas(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;  

CREATE TABLE listaRespuestas(
id int(11) NOT NULL AUTO_INCREMENT,
idPregunta int NOT NULL,
idRespuesta int  NOT NULL,
idUsuario int NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (idPregunta) REFERENCES preguntas(id),
FOREIGN KEY (idRespuesta) REFERENCES respuestas(id),
FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE listaAdivinanzas(
id int(11) NOT NULL AUTO_INCREMENT,
idListaRespuesta int NOT NULL,
idUsuarioAdivina int NOT NULL, 
estado BOOLEAN NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (idListaRespuesta) REFERENCES listaRespuesta(id),
FOREIGN KEY (idUsuarioAdivina) REFERENCES usuarios(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `preguntas`(`texto`) VALUES ('en un golpe de castigo a 15 a favor, ¿por qué tipo de jugada te decantarías?')
INSERT INTO `preguntas`(`texto`) VALUES ('lo mejor de los terceros tiempos es... ')
INSERT INTO `respuestas`(`idPregunta`, `texto`) VALUES ('1', 'ensayo de maul')
INSERT INTO `respuestas`(`idPregunta`, `texto`) VALUES ('1', 'dos fases de delanteras y en la última fase sacar el balón rápido a la línea ')
INSERT INTO `respuestas`(`idPregunta`, `texto`) VALUES ('1', 'buscar la touche, así estaremos más cerca')
INSERT INTO `respuestas`(`idPregunta`, `texto`) VALUES ('1', 'muchas fases de contacto hasta llegar a ensayo')
INSERT INTO `respuestas`(`idPregunta`, `texto`) VALUES ('2', 'la touche')
INSERT INTO `respuestas`(`idPregunta`, `texto`) VALUES ('2', 'cantar')
INSERT INTO `respuestas`(`idPregunta`, `texto`) VALUES ('2', 'borracheras')
INSERT INTO `respuestas`(`idPregunta`, `texto`) VALUES ('2', 'puños fuera')