import { useEffect, useState } from 'react';
import ProductList from './components/ProductList';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { id: 1, name: 'Notebook', price: 70 },
    { id: 2, name: 'Bottle', price: 120 },
    { id: 3, name: 'Headphone', price: 950 },
    { id: 4, name: 'Laptop Stand', price: 560 }
  ];

  function addToCart() {
    setCartCount(function (oldCount) {
      return oldCount + 1;
    });
  }

  useEffect(function () {
    console.log('Cart count updated:', cartCount);
  }, [cartCount]);

  return (
    <div className="page">
      <h1>Dynamic Product Cart</h1>
      <p className="count-box">Cart Count: {cartCount}</p>
      <ProductList products={products} onAdd={addToCart} />
    </div>
  );
}

export default App;
