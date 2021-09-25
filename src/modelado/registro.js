const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

//schema => donde se encuentra almacenada la GB
const { Schema } = mongoose;

const UserSchema = new Schema({
    usuario: { type: String, required: true },
    clave: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// vamos a encriptar el passeord
// vamos a usar la libreria bcrypt
UserSchema.pre('save', function (next) {
    // gensalt = hash => proceso donde se inserta la contraseña y se le adiciona un codigo
    bcrypt.genSalt(15).then(salts => {
        // el numero 15 equivale a la cantidad de veces que se ejecuta el algoritmo de encriptacion
        bcrypt.hash(this.clave, salts).then(hash => {
            this.clave = hash;
            next();
        }).catch(error => next());

    }).catch(error => next());
})



// vamos a crear la coleccion usuarios
module.exports = mongoose.model('usuarios', UserSchema)