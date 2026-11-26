import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const parsePrice = (costStr) => parseFloat(String(costStr).replace(/[^0-9.]/g, '')) || 0;

  const calculateTotalCost = (item) => {
    return (parsePrice(item.cost) * item.quantity).toFixed(2);
  };

  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + parsePrice(item.cost) * item.quantity, 0)
      .toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    setCheckoutMessage('Coming Soon');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>

      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.name} className="cart-item-card">
            <img src={item.image} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>Unit Price: {item.cost}</p>
              <p>Total Cost: ${calculateTotalCost(item)}</p>
              <div>
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <button onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))
      )}

      {checkoutMessage && <p>{checkoutMessage}</p>}

      <div className="cart-actions">
        <button onClick={onContinueShopping}>Continue Shopping</button>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
