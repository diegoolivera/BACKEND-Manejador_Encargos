const express = require('express');
const router = express.Router();
const Usuario = require("../models/usuario")


const { ErrorHandler, catchAsyncErrors } = require('../middlewares/errores');


router.get('/', catchAsyncErrors(async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.status(200).json(usuarios); 
}));

router.get('/:id', catchAsyncErrors(async (req, res, next) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) {
    return next(new ErrorHandler('Usuario no encontrado', 404));
  }
  res.status(200).json(usuario);
}));

router.post('/', catchAsyncErrors(async (req, res, next) => {
  const usuario = await Usuario.create(req.body);
  res.status(201).json(usuario);
}));

router.put('/:id', catchAsyncErrors(async (req, res, next) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) {
    return next(new ErrorHandler('Usuario no encontrado', 404));
  }
  await usuario.update(req.body);
  res.status(200).json(usuario);
}));

router.delete('/:id', catchAsyncErrors(async (req, res, next) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) {
    return next(new ErrorHandler('Usuario no encontrado', 404));
  }
  await usuario.destroy();
  res.status(204).json();
}));

module.exports = router;
