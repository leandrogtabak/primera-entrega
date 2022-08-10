const express = require('express');
const { Router } = express;

const router = Router();

const mascotas = [
  {
    nombre: 'Golda',
    edad: 3,
    raza: 'Daschund',
  },
  {
    nombre: 'Lolo',
    edad: 1,
    raza: 'Calle',
  },
];

router.get('/', (req, res) => {
  res.send(mascotas);
});

router.post('/', (req, res) => {
  const mascotaRecibida = req.body;
  const mascotaAGuardar = { ...mascotaRecibida, edad: parseInt(mascotaRecibida.edad) };
  mascotas.push(mascotaAGuardar);
  res.status(201).send({ status: 'ok' });
});

module.exports = router;
