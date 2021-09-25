// mongo => no estructurado => no filas no columas
// mongo => colecciones(tablas)
// mongo => documentos
// mongo => conjunto de colecciones
// mongo => colecciones => conjuntos de documentos => bson
// mongo => no se requiere crear la base de datos inicialmente

const mongoose = require('mongoose');

// a continuacion vamos a conectar la base de datos
mongoose.connect('mongodb://localhost/GESTION', {
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
    useNewUrlParser: true,
});