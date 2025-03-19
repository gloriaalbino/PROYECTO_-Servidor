const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Tarea', tareaSchema);