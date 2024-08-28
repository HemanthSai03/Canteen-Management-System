// src/CartPage.js
import React from 'react';
import { useCart } from '../CartContext'; // Import the Cart Context

const CartPage = () => {
  const { cart, removeFromCart } = useCart(); // Use Cart Context

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.length > 0 ? (
          cart.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Category: {item.category}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
            </li>
          ))
        ) : (
          <p>Cart is empty</p>
        )}
      </ul>
    </div>
  );
};

export default CartPage;
