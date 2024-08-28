// src/components/CartPage.js
import React from 'react';
import { useCart } from '../CartContext'; // Import the Cart Context

const CartPage = () => {
  const { cart, removeFromCart } = useCart(); // Use Cart Context

  const handleRemoveClick = (item) => {
    removeFromCart(item);
    alert(`${item.name} has been removed from your cart!`);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Category: {item.category}</p>
              <button onClick={() => handleRemoveClick(item)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
