# Pokemon full stack

## Descripción

Este proyecto es una aplicación web que permite visualizar los "pokemones" de la primera generación, además de poder filtrarlos por tipo y ver sus detalles.

## Pre-requisitos

Para poder ejecutar este proyecto es necesario tener instalado:

- [Node.js](https://nodejs.org/es/) >= 18.13.0
- [npm](https://www.npmjs.com/) >= 6.14.8

Los "pokemones" se almacenan en una base de datos de [MySQL](https://www.mysql.com/), por lo que es necesario tener instalado un servidor de MySQL, como [XAMPP](https://www.apachefriends.org/es/index.html) o [WAMPP](https://www.wampserver.com/en/).

No obstante, es preferible tener una instancia de [Docker](https://www.docker.com/) con una imagen de MySQL, ya que de esta manera se puede ejecutar el proyecto sin necesidad de instalar nada más.

### Instalación de Docker

Para instalar Docker, se debe seguir la [guía de instalación](https://docs.docker.com/engine/install/) de Docker.

### Instanciar una imagen de MySQL

Una vez instalado Docker, se debe instanciar una imagen de MySQL. Para ello, se debe ejecutar el siguiente comando:

```bash
docker run --name Mysql -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -v mysql:/var/lib/mysql mysql:latest
```

Este comando instanciará una imagen de MySQL con el nombre "Mysql", con el puerto 3306 expuesto, la contraseña "root" para el usuario "root" y con un volumen llamado "mysql" para almacenar los datos de la base de datos.

### Crear la base de datos

Una vez instanciada la imagen de MySQL, se debe crear la base de datos. Para ello, se debe ejecutar el siguiente comando:

```bash
docker exec -it Mysql bash
```

Con este comando, se accederá a la consola de la imagen de MySQL. Una vez dentro, se debe ejecutar el siguiente comando:

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p
```

Este commando conectará a la base de datos con el usuario "root" y la contraseña "root".

Tendremos que crear la base de datos con el siguiente comando:

```bash
CREATE DATABASE poke_api;
```

Una vez creada la base de datos, se debe salir de la consola de MySQL con el siguiente comando:

```bash
exit
```

Con esto, ya se tiene una instancia de MySQL con la base de datos creada.

## Instalación

Para instalar el proyecto, se debe clonar el repositorio con el siguiente comando:

```bash
git clone git@github.com:manuelmartin-developer/pokeapi.git
```

Este proyecto se compone de dos partes: el backend y el frontend. Para instalar cada parte, se debe acceder a la carpeta correspondiente.

### Instalación del backend

Una vez clonado el repositorio, se debe acceder a la carpeta del proyecto con el siguiente comando:

```bash
cd poke_api
```

Una vez dentro de la carpeta del proyecto, se debe instalar las dependencias con el siguiente comando:

```bash
npm install
```

Iniciaremos el servidor con el siguiente comando:

```bash
npm start
```

Nuestro servidor se ejecutará en el puerto 3000, por lo que se podrá acceder a él en la siguiente dirección: http://localhost:3000. Los datos iniciales se cargarán automáticamente en la base de datos al iniciar el servidor.

### Instalación del frontend

Teniendo el backend instalado, se debe acceder a la carpeta del frontend con el siguiente comando:

```bash
cd poke_front
```

Una vez dentro de la carpeta del frontend, se debe instalar las dependencias con el siguiente comando:

```bash
npm install
```

Compilaremos el frontend con el siguiente comando:

```bash
npm run build
```

E iniciaremos el frontend con el siguiente comando:

```bash
npm start
```

Nuestro frontend se ejecutará en el puerto 4173, por lo que se podrá acceder a él en la siguiente dirección: http://localhost:4173

## Uso

Una vez instalado el proyecto, se podrá acceder a él en la siguiente dirección: http://localhost:4173

## Licencia

Este proyecto es completamente libre, por lo que se puede usar, copiar, modificar, publicar, distribuir, sublicenciar y/o vender copias sin ninguna restricción.
