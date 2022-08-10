const express = require('express');
const { Router } = express;

const router = Router();

const personas = [
  {
    nombre: 'Leandro',
    apellido: 'Tabak',
    edad: 35,
  },
  {
    nombre: 'Nurit',
    apellido: 'Szerman',
    edad: 34,
  },
];

router.get('/', (req, res) => {
  res.send(personas);
});

router.post('/', (req, res) => {
  const personaRecibida = req.body;
  const personaAGuardar = { ...personaRecibida, edad: parseInt(personaRecibida.edad) };
  personas.push(personaAGuardar);
  res.status(201).send({ status: 'ok' });
});

module.exports = router;
