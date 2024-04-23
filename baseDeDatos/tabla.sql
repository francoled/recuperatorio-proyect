DROP DATABASE mi_base_de_datos;
CREATE DATABASE  mi_base_de_datos;
USE mi_base_de_datos;

CREATE TABLE CATEGORIA
       (
       ID_CATEGORIA BIGINT NOT NULL ,                              
       NOMBRE VARCHAR(20) NULL,                              
       PRIMARY KEY
               (
               ID_CATEGORIA
               )
       );

CREATE TABLE USERS
       (
       ID_USERS BIGINT NOT NULL AUTO_INCREMENT,                              
       ID_CATEGORIA BIGINT NOT NULL,                              
       NOMBRE VARCHAR(20)NOT NULL,                              
       APELLIDO VARCHAR(25) NOT NULL,                              
       EMAIL VARCHAR(50)NOT NULL,                              
       CONTRASEÑA VARCHAR(100)NOT NULL,                              
       IMAGEN VARCHAR(100) NOT NULL,                              
       PRIMARY KEY
               (
               ID_USERS
               ),
       FOREIGN KEY
               (
               ID_CATEGORIA
               )
          REFERENCES CATEGORIA
               (
               ID_CATEGORIA
               )
       );
       ALTER TABLE USERS ADD COLUMN deleted_at TIMESTAMP NULL;
       INSERT INTO categoria(ID_CATEGORIA, NOMBRE)
	VALUES (1, 'admin');
	INSERT INTO categoria(ID_CATEGORIA, NOMBRE)
	VALUES (2, 'usuario');