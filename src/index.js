
//mongoose => driver de conexion de mongo
// vamos a crear el indice de nuestro CRUD
//express => sirve para que nuestra aplicacion, programa o proyecto se ejecute bajo ambiente web
// a continuacion vamos a usar el paquete express
const express = require('express');

const puerto = express();

// a continuacion asignamos a la constante exphbs el paquete 
const exphbs = require('express-handlebars');
const { patch } = require('./rutas/index');

const path = require('path');
const bodyParser = require('body-parser');

//tcp => protocolo
//udp => protocolo de datagrama de usuario
//https => protocolo de hipertexto no seguro

//puertos logicos (65.535) y puertos fisicos (usb, serial. paralelos)

require('./database');

puerto.set('escuchando', 31);

//ahora vamos a usar el puerto
puerto.listen(puerto.get('escuchando'), () => {
    console.log('el servidor escucha por el puerto--- y se realiza la prueba para el git: ', puerto.get('escuchando'))
});

puerto.use(express.json());
puerto.use(bodyParser.json());
puerto.use(bodyParser.urlencoded({ extend: true }));

//Se configuran las views 
puerto.set('views', path.join(__dirname, 'vistas'));

// ahora vamos a usar el paquete de plantillas handlebars 
puerto.engine(
    "hbs",
    exphbs({
        extname: "hbs",
        defaultLayout: false,
        layoutsDir: "views/layouts/"
    })
);

//implementamos el engine 
puerto.set('view engine', '.hbs');
puerto.use(require('./rutas/index'));
