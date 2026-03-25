const express = require('express');
const productStore = require('./products');

const app = express();
const PORT = 3003;

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Task 2 Product API is running. Use /products and /products/:id');
});

app.get('/products', function (req, res) {
  res.json(productStore.getAllProducts());
});

app.post('/products', function (req, res) {
  const body = req.body;
  const products = productStore.getAllProducts();

  if (!body.name || body.price === undefined) {
    res.status(400).json({ message: 'name and price are required' });
    return;
  }

  const newProduct = {
    id: products.length + 1,
    name: body.name,
    price: Number(body.price)
  };

  productStore.addProduct(newProduct);
  res.status(201).json(newProduct);
});

app.put('/products/:id', function (req, res) {
  const id = Number(req.params.id);
  const body = req.body;
  const products = productStore.getAllProducts();

  const updated = [];
  let found = false;

  for (let i = 0; i < products.length; i = i + 1) {
    const item = products[i];

    if (item.id === id) {
      updated.push({
        id: item.id,
        name: body.name || item.name,
        price: body.price !== undefined ? Number(body.price) : item.price
      });
      found = true;
    } else {
      updated.push(item);
    }
  }

  if (!found) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  productStore.replaceProducts(updated);
  res.json({ message: 'Product updated' });
});

app.delete('/products/:id', function (req, res) {
  const id = Number(req.params.id);
  const products = productStore.getAllProducts();
  const nextProducts = [];
  let found = false;

  for (let i = 0; i < products.length; i = i + 1) {
    if (products[i].id === id) {
      found = true;
    } else {
      nextProducts.push(products[i]);
    }
  }

  if (!found) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  productStore.replaceProducts(nextProducts);
  res.json({ message: 'Product deleted' });
});

app.listen(PORT, function () {
  console.log('Task 2 server running on http://localhost:' + PORT);
});
