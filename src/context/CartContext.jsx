import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  // Load cart from Firestore when user logs in or page refreshes
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            setCart(cartSnap.data().items || []);
          } else {
            setCart([]); // If no cart exists, start with an empty cart
          }
        } catch (err) {
          console.error('Failed to load cart:', err);
          setCart([]); // Fallback to empty cart on error
        }
      } else {
        setCart([]); // Clear cart if user logs out
      }
    };

    loadCart();
  }, [user]); // Re-run when user changes (login/logout)

  // Save cart to Firestore whenever it changes
  const saveCartToFirestore = async (updatedCart) => {
    if (user) {
      try {
        const cartRef = doc(db, 'carts', user.uid);
        await setDoc(cartRef, { items: updatedCart }, { merge: true });
      } catch (err) {
        console.error('Failed to save cart:', err);
      }
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      saveCartToFirestore(updatedCart); // Save to Firestore
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      saveCartToFirestore(updatedCart); // Save to Firestore
      return updatedCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      saveCartToFirestore(updatedCart); // Save to Firestore
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    saveCartToFirestore([]); // Clear in Firestore
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartContext;