const { Contenedor } = require('./handleFiles');
const express = require('express');
const { Router } = express;

const listProducts = new Contenedor('../productos.json');
const routerProducts = Router();

const authorize = true;

const authorizeMiddle = (metodo) => {
  return (req, res, next) => {
    if (authorize) {
      return next();
    }
    return res.status(401).send({ error: -1, descripcion: `ruta ${req.baseUrl} método ${metodo} no autorizada` });
  };
};

/*-------  Endpoints -------*/

// GET api/productos
routerProducts.get('/', async (req, res) => {
  console.log('Get all products received OK');
  try {
    let productos = await listProducts.getAll();
    res.status(201).send(productos);
  } catch (e) {
    console.log(e);
  }
});

// GET api/productos/:id
routerProducts.get('/:id', async (req, res) => {
  console.log('Get product by Id received OK');
  try {
    const id = Number(req.params.id);
    let producto = await listProducts.getById(id);
    if (producto) {
      res.status(201).send(producto);
    } else {
      res.status(400).send({ error: 'producto no encontrado' });
    }
  } catch (e) {
    console.log(e);
  }
});

// POST api/productos/
routerProducts.post('/', authorizeMiddle('post'), async (req, res) => {
  console.log('Post product received OK');
  try {
    const productoACargar = req.body;
    await listProducts.save(productoACargar);
    res.status(201).send(productoACargar);
  } catch (e) {
    console.log(e);
  }
});

// DELETE api/productos
routerProducts.delete('/:id', authorizeMiddle('delete'), async (req, res) => {
  console.log('Delete product by Id received OK');
  try {
    const id = Number(req.params.id);
    let producto = await listProducts.getById(id);
    if (producto) {
      const productos = await listProducts.deleteById(id);
      res.status(201).send(productos);
    } else {
      res.status(400).send({ error: 'producto no encontrado' });
    }
  } catch (e) {
    console.log(e);
  }
});
// PUT api/productos
routerProducts.put('/:id', authorizeMiddle('put'), async (req, res) => {
  console.log('Put product by Id received OK');
  try {
    const id = Number(req.params.id);
    const productoAUpdate = req.body;
    let producto = await listProducts.getById(id);
    if (producto) {
      const productos = await listProducts.updateById(id, productoAUpdate);
      res.status(201).send(productos);
    } else {
      res.status(400).send({ error: 'producto no encontrado' });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = routerProducts;
