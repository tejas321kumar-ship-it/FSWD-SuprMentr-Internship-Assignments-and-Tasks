const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

const products = [
  {
    id: 1,
    name: 'Canvas Office Bag',
    category: 'Accessories',
    price: 1299,
    rating: 4.2,
    description: 'Strong canvas bag with laptop pocket.'
  },
  {
    id: 2,
    name: 'Wireless Mouse M20',
    category: 'Electronics',
    price: 899,
    rating: 4.1,
    description: 'Compact mouse with silent click buttons.'
  },
  {
    id: 3,
    name: 'Street Runner Shoes',
    category: 'Footwear',
    price: 2499,
    rating: 4.4,
    description: 'Daily comfort shoes with light sole.'
  },
  {
    id: 4,
    name: 'Classic Denim Jacket',
    category: 'Fashion',
    price: 3299,
    rating: 4.5,
    description: 'Blue denim jacket for casual wear.'
  },
  {
    id: 5,
    name: 'Bluetooth Neckband',
    category: 'Electronics',
    price: 1599,
    rating: 4.0,
    description: 'Neckband with clear mic and deep bass.'
  },
  {
    id: 6,
    name: 'Minimal Wrist Watch',
    category: 'Accessories',
    price: 1899,
    rating: 4.3,
    description: 'Clean dial watch with metal strap.'
  },
  {
    id: 7,
    name: 'Soft Cotton T-Shirt',
    category: 'Fashion',
    price: 799,
    rating: 4.1,
    description: 'Breathable cotton fabric and regular fit.'
  },
  {
    id: 8,
    name: 'Travel Sneakers X',
    category: 'Footwear',
    price: 2799,
    rating: 4.6,
    description: 'Comfort sneakers made for long walks.'
  }
];

app.get('/api/products', function (req, res) {
  res.json(products);
});

app.get('/', function (req, res) {
  res.send('Product server is running. Open /api/products');
});

app.listen(PORT, function () {
  console.log('Server running at http://localhost:' + PORT);
});
