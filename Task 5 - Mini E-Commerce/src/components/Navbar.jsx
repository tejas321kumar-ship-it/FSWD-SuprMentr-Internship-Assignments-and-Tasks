import { useCart } from '../context/CartContext';

function Navbar() {
  const { cartItems } = useCart();

  return (
    <header className="nav">
      <h1>Mini E-Commerce</h1>
      <p>Cart: {cartItems.length}</p>
    </header>
  );
}

export default Navbar;
