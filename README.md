
## Requerimientos ##

 - NodeJS: https://nodejs.org/
 - MongoDB: https://www.mongodb.com/
 - Bower: *npm install -g bower*
 - Gulp: *npm install -g gulp*

## Instalacion ##
git clone https://github.com/Trtinteractive/Dashboard.git

## Instalacion de dependencias ##
npm install && bower install

## Tareas de Gulp ##
Principales tareas para ambiente de desarrollo.

 - gulp (default): concatena, minifica y mapea los archivos .js y .scss (dependencias y app) y corre el servidor.
 - gulp build: Concatena y minifica los archivos .js y scss (dependencias y app, esta tarea es para construir version de produccion).
 - gulp jshint y gulp jscs: Estas 2 tareas revisan las buenas practias dentro del codigo javascript.

**Nota**: Las tareas se corren en la raiz del proyecto.

## Servidor ##
Para correr el servidor de produccion se corre el comando **"node index.js"** en la raiz del proyecto.
