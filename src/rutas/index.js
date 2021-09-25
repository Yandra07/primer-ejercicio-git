const { Router, response } = require("express");

const express = require("express");

const archivo = express.Router();

const passport = require('passport');

const User = require('../modelado/registro');
const bcrypt = require ('bcrypt');

// ahora damos iniciio a la sesion
archivo.get('/', (req,res, next)=>{
    res.render('IniciarSesion');
})

//ahora vamos a obtener el formulario
//midware => capa intermedia de comunicacion, si hay un req debe haber un res
archivo.get('/formulario', (require, response, next) => {
    response.render('formulario')
});


// Se guardan los datos asincronicamente
// se declara la funcion

archivo.post('/formulario', async(req, res) => {

    const {usuario, clave, date} = req.body;

    //aqui vamos a validar que el email no exista

    const E = await User.findOne({usuario});

    if (E){res.send('el email ya existe');}

    else{

        const nuevoU = new User({usuario, clave, date});

    await  nuevoU.save();

    res.send ('el documento se guardo satisfactoriamente');

    }

})

archivo.post('/formulario', async (req, res) => {
   const { usuario, clave, fecha_ingreso } = req.body;
   const nuevoU = new User({ usuario, clave, fecha_ingreso });
   await nuevoU.save();
    res.send('Se guardaron los datos correctamente');
});

// se implementa el post del inicio de sesion
archivo.post('/IniciarSesion', async(req, res) =>{
    //cuando el usuario ingrese al sistema debe escribir la clave normal
    const { usuario, clave, fecha_ingreso } = req.body;

    const user = await User.findOne({usuario});

    if (User){
        // vamos a verificar el password
        var contraseña = req.body.clave; 

        // p= la clave encriptada y req body es el modelado 
        var p = user.clave

        bcrypt.compare(contraseña,p, function(error, isMatch){
            if (error){
                throw error //Desición
            }else if (!isMatch){
                res.send("La contraseña no es correcta")
            }else {
                res.send("Usted es un usuario autorizado, pero la pagina esta en construcción")
            }

        })
     }else {
         res.render('formulario');
     }

})


// vamos a exportar este programa index para que otros lo puedan usar
module.exports = archivo;
