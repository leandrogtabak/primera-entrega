const express = require('express');
const routerProducts = require('./productos');
const routerCart = require('./carrito');
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);

const server = app.listen(PORT, () => {
  console.log(`Servidor http corriendo en el puerto ${server.address().port}`);
});

app.get('/*', (req, res) => {
  res.status(404).send({ error: -2, descripcion: `ruta ${req.url} no implementada` });
});
server.on('error', (error) => console.log(`Error en el servidor: ${error}`));
