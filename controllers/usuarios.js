const express = require('express');
const userRouter = express.Router();
const UserModel = require('../models/usuario');

// GET: Listar todos los usuarios
userRouter.get('/', async (request, response) => {
    try {
        const users = await UserModel.find();  // 'users' será un array
        response.status(200).json(users); // Enviar el array
    } catch (error) {
        console.error('Error al obtener usuarios', error);
        response.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// POST: Registro del username que el usuario ingresó en el formulario
userRouter.post('/', async (request, response) => {
    const { username } = request.body;

    if (!username) {
        return response.status(400).json({ error: 'Todos los campos son obligatorios' });
    } else {
        let usuario = new UserModel();
        usuario.username = username;

        try {
            await usuario.save(); // Guardar en la BD
            const usuario_consulta = await UserModel.find();
            console.log('test', usuario_consulta); // Consulta a la BD
            return response.status(200).json({ mensaje: 'Usuario creado correctamente' });
        } catch (error) {
            console.error('Error al guardar usuario', error);
            return response.status(500).json({ error: 'Error al guardar usuario' });
        }
    }
});

// DELETE: Eliminar un usuario por su ID
userRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const usuario = await UserModel.findByIdAndDelete(id);
        if (!usuario) {
            return response.status(404).json({ error: 'Usuario no encontrado' });
        }
        return response.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario', error);
        return response.status(500).json({ error: 'Error al eliminar usuario' });
    }
});

// Ruta para cerrar sesión
userRouter.post('/logout', (request, response) => {
    if (request.session) {
        request.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: 'Error al cerrar sesión' });
            }
            response.clearCookie('connect.sid');
            return response.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
        });
    } else {
        return response.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
    }
});

module.exports = userRouter;