import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import { CartProvider } from './context/CartContext';
import { getProducts } from './services/productService';

function App() {
  const products = getProducts();

  return (
    <CartProvider>
      <div className="page">
        <Navbar />
        <ProductList products={products} />
      </div>
    </CartProvider>
  );
}

export default App;
