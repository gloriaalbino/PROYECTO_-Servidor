const express = require('express');
const tareaRouter = express.Router();
const TareaModel = require('../models/tarea');

// GET: Listar todas las tareas
tareaRouter.get('/', async (req, res) => {
    try {
        const tareas = await TareaModel.find();
        res.status(200).json(tareas);
    } catch (error) {
        console.error('Error al obtener tareas', error);
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
});

// POST: Crear una nueva tarea
tareaRouter.post('/', async (req, res) => {
    const { text, user } = req.body;

    if (!text || !user) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevaTarea = new TareaModel({ text, user });

    try {
        await nuevaTarea.save();
        res.status(201).json({ mensaje: 'Tarea creada correctamente' });
    } catch (error) {
        console.error('Error al crear tarea', error);
        res.status(500).json({ error: 'Error al crear tarea' });
    }
});

// DELETE: Eliminar una tarea por su ID
tareaRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const tarea = await TareaModel.findByIdAndDelete(id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json({ mensaje: 'Tarea eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar tarea', error);
        res.status(500).json({ error: 'Error al eliminar tarea' });
    }
});

// PATCH: Actualizar una tarea por su ID
tareaRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { checked } = req.body;

    try {
        const tarea = await TareaModel.findByIdAndUpdate(id, { checked }, { new: true });
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json(tarea);
    } catch (error) {
        console.error('Error al actualizar tarea', error);
        res.status(500).json({ error: 'Error al actualizar tarea' });
    }
});

module.exports = tareaRouter;