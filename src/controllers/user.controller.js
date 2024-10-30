import userModel from '../models/user.model.js';
import asyncHandler from 'express-async-handler';

const get = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const data = await userModel.findById(id)

    res.json({
        data: data
    });
})

const getAll = asyncHandler(async (_req, res) => {
    const data = await userModel.find({})

    res.json({
        data: data
    });
})

const create = asyncHandler(async (req, res) => {
    const { name, lastname, rol, email, status } = req.body;

    if (!name || !lastname || !rol || !email || !status) {
        res.status(401);
        throw new Error('Campos invalidos');
    }

    const newUser = new userModel({ name, lastname, rol, email, status });
    await newUser.save();

    res.status(201).json({
        message: 'Guardado'
    });
})

const update = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name, lastname, rol, email, status } = req.body;

    if (!name || !lastname || !rol || !email || !status) {
        res.status(401);
        throw new Error('Campos invalidos');
    }

    await userModel.findByIdAndUpdate(id, { name, lastname, rol, email, status })

    res.status(201).json({
        message: 'Actualizado'
    });
})

const remove = asyncHandler(async (req, res) => {
    const { id } = req.params

    await userModel.findByIdAndDelete(id)

    res.status(201).json({
        message: 'Eliminado'
    });
})

const userController = {
    get,
    getAll,
    create,
    update,
    remove
};

export default userController;