const express = require('express');
const mascotas = require('./modules/mascotas');
const personas = require('./modules/personas');

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http corriendo en el puerto ${server.address().port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/mascotas', mascotas);
app.use('/api/personas', personas);

app.use(express.static('public'));

server.on('error', (error) => console.log(`Error en el servidor: ${error}`));
