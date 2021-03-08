var mongoose = require('mongoose');

module.exports = mongoose.model('Persona', {
    nombre: String,
    apellidos: String,
    email: String,
    imagen: String,
    direccion: String,
    celular: String,
    edad: String,
    alergias: String,
    tamanno: String,
    peluches: []
});


