import { useCart } from '../context/CartContext';

function ProductList(props) {
  const { addToCart, removeFromCart, cartItems } = useCart();

  function countInCart(id) {
    let count = 0;

    for (let i = 0; i < cartItems.length; i = i + 1) {
      if (cartItems[i].id === id) {
        count = count + 1;
      }
    }

    return count;
  }

  return (
    <div className="grid">
      {props.products.map(function (item) {
        return (
          <div className="card" key={item.id}>
            <h3>{item.name}</h3>
            <p>Rs {item.price}</p>
            <p>In Cart: {countInCart(item.id)}</p>
            <div className="actions">
              <button onClick={function () { addToCart(item); }}>Add</button>
              <button className="remove" onClick={function () { removeFromCart(item.id); }}>
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
