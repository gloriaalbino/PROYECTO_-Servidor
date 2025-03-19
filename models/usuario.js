const mongoose = require('mongoose');

// Definir el esquema para el usuario
const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
});

// Registrar el modelo
module.exports = mongoose.model('Usuario', usuarioSchema);
