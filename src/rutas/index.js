const { Router, response } = require("express");

const express = require("express");

const archivo = express.Router();

const passport = require('passport');

const User = require('../modelado/registro');

const Registro = require('../modelado/Crear_Usuarios');

const bcrypt = require('bcrypt');
const { updateOne } = require("../modelado/registro");

//const mostrar = require('Ver_Usuario');

// ahora damos iniciio a la sesion
archivo.get('/', (req, res, next) => {
    res.render('inicio');
})

// ahora damos iniciio a la sesion
archivo.get('/home', (req, res, next) => {
    res.render('HOME');
})

//ahora vamos a obtener el formulario
//midware => capa intermedia de comunicacion, si hay un req debe haber un res
//archivo.get('/inicio', (require, response, next) => {
//    response.render('inicio')
//});


//ahora vamos a obtener el formulario
//midware => capa intermedia de comunicacion, si hay un req debe haber un res
archivo.get('/IniciarSesion', (require, response, next) => {
    response.render('IniciarSesion')
});

//ahora vamos a obtener el formulario
//midware => capa intermedia de comunicacion, si hay un req debe haber un res
archivo.get('/formulario', (require, response, next) => {
    response.render('formulario')
});

archivo.get('/crear-usuario', (require, response, next) => {
    response.render('Crear_Usuarios')
});

archivo.get('/mostrar-usuarios', async (require, response, next) => {
    const Usuarios = await Registro.find().lean();
    response.render('Ver_Usuario', { Usuarios: Usuarios })
});

archivo.get('/mostrar-editar-usuarios', async (require, response, next) => {
    const Usuarios = await Registro.find().lean();
    response.render('Ver_Editar_Usuarios', { Usuarios: Usuarios })
});

archivo.get('/mostrar-eliminar-usuarios', async (require, response, next) => {
    const Usuarios = await Registro.find().lean();
    response.render('Ver_Eliminar_Usuarios', { Usuarios: Usuarios })
});

archivo.get('/update', async (req, response) => {
    const { Nombre, Cedula, Telefono, Email } = req.query;
    const Usuario = await Registro.findOne({ Cedula }).lean();
    console.log('Registro buscado', Usuario);
    response.render('Actualizar_Usuario', { Usuario: Usuario })
});

// Se guardan los datos asincronicamente
// se declara la funcion

archivo.post('/formulario', async (req, res) => {

    const { usuario, clave, date } = req.body;

    //aqui vamos a validar que el email no exista

    const E = await User.findOne({ usuario });

    if (E) { res.send('el email ya existe'); }

    else {

        const nuevoU = new User({ usuario, clave, date });

        await nuevoU.save();

        res.send('el documento se guardo satisfactoriamente');

    }

})

archivo.post('/formulario', async (req, res) => {
    const { usuario, clave, fecha_ingreso } = req.body;
    const nuevoU = new User({ usuario, clave, fecha_ingreso });
    await nuevoU.save();
    res.send('Se guardaron los datos correctamente');
});

// se implementa el post del inicio de sesion
archivo.post('/IniciarSesion', async (req, res) => {
    //cuando el usuario ingrese al sistema debe escribir la clave normal
    const { usuario, clave, fecha_ingreso } = req.body;

    const user = await User.findOne({ usuario });

    if (User) {
        // vamos a verificar el password
        var contraseña = req.body.clave;

        // p= la clave encriptada y req body es el modelado 
        var p = user.clave

        bcrypt.compare(contraseña, p, function (error, isMatch) {
            if (error) {
                throw error //Desición
            } else if (!isMatch) {
                res.send("La contraseña no es correcta")
            } else {
                res.render('HOME')
            }

        })
    } else {
        res.render('formulario');
    }

})

archivo.post('/crear-usuario', async (req, res) => {
    //cuando el usuario ingrese al sistema debe escribir la clave normal
    const { Nombre, Cedula, Telefono, Email } = req.body;

    const nuevoUduarioBaseDatos = await Registro.findOne({ Cedula });
    console.log("usuarioDB", nuevoUduarioBaseDatos);
    if (nuevoUduarioBaseDatos) {
        res.send('Ya existe un usario con esta cedula');
    }

    else {

        const nuevoRdegistro = new Registro({ Nombre, Cedula, Telefono, Email });

        await nuevoRdegistro.save();

        res.send('Registro creado con éxito');

    }

})

archivo.post('/update', async (req, response) => {
    const thing = new Registro({
        _id: req.body._id,
        Nombre: req.body.Nombre,
        Cedula: req.body.Cedula,
        Telefono: req.body.Telefono,
        Email: req.body.Email,
    });
    const update = await Registro.updateOne({ _id: req.body._id }, thing);
    response.redirect('/mostrar-editar-usuarios');
});

archivo.get('/delete', async (req, response) => {
    const update = await Registro.findOneAndDelete({ _id: req.query._id });
    response.redirect('/mostrar-editar-usuarios');
});

// vamos a exportar este programa index para que otros lo puedan usar
module.exports = archivo;
