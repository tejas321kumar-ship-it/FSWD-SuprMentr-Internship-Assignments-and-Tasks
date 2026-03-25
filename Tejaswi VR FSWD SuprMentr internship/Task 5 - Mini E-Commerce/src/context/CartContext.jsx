import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider(props) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    setCartItems(function (oldItems) {
      return oldItems.concat(product);
    });
  }

  function removeFromCart(id) {
    setCartItems(function (oldItems) {
      const nextItems = [];
      let removed = false;

      for (let i = 0; i < oldItems.length; i = i + 1) {
        if (!removed && oldItems[i].id === id) {
          removed = true;
        } else {
          nextItems.push(oldItems[i]);
        }
      }

      return nextItems;
    });
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
