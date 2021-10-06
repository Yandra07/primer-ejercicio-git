const mongoose = require('mongoose');


//schema => donde se encuentra almacenada la GB
const { Schema } = mongoose;

const RegisterSchema = new Schema({
    Nombre: { type: String, required: true },
    Cedula: { type: String, required: true },
    Telefono: { type: String, require: true },
    Email: { type: String, required: true },
});


// vamos a crear la coleccion usuarios
module.exports = mongoose.model('Registo', RegisterSchema)