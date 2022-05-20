const mongoose = require('mongoose');


//schema => donde se encuentra almacenada la GB
const { Schema } = mongoose;

const actualizaciondedato = new Schema({
    Nombre: { type: String, required: true },
    Cedula: { type: String, required: true },
    id:{ type: String, required: true },
    Telefono: { type: String, require: true },
    Email: { type: String, required: true },
    actividad: { type: String, required: true },
    fecha: { type: Date, required: true },
});

/*function myFunction() {
    return Model.find(...)
      .then(r1 => Model2.updateOne(...))
      .then(r2 => Model3.updateMany(...))
      .then(r3 => {
         return myFunctionResult 
      })
  }*/
  


// vamos a crear la coleccion usuarios
module.exports = mongoose.model('Registo', actualizaciondedato)