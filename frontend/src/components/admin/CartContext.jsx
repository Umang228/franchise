// CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    // Add more cases for other cart actions (remove from cart, update quantity, etc.)
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart data from local storage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      dispatch({ type: 'CLEAR_CART' }); // Clear existing cart
      dispatch({ type: 'ADD_TO_CART', payload: JSON.parse(storedCart) });
    }
  }, []);

  // Update local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // You can add more functions for other cart actions

  return (
    <CartContext.Provider value={{ ...state, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    // throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
