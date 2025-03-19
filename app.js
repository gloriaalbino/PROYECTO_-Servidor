require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const userRouter = require('./controllers/usuarios');
const tareaRouter = require('./controllers/tareas');
const app = express();

// Conexión a la BD
async function conectarBD() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a BD correcta');
    } catch (error) {
        console.log('No se ha podido conectar a la BD', error);
    }
}

conectarBD();

// Middleware
app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Rutas de frontend
app.use('/', express.static(path.resolve(__dirname, 'views', 'home')));
app.use('/tareas', express.static(path.resolve(__dirname, 'views', 'tareas')));

// Rutas de backend
app.use('/users', userRouter);
app.use('/api/tareas', tareaRouter);

module.exports = app;