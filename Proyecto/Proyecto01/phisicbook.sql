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
estado ENUM ('enviada', 'aceptada', 'agregar') NOT NULL,
 FOREIGN KEY (amigo1) REFERENCES usuarios(id),
 FOREIGN KEY (amigo2) REFERENCES usuarios(id),
 PRIMARY KEY (amigo1,amigo2)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;
