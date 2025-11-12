import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MenuItem } from "@/data/menuData";

export interface CartItem {
  item: MenuItem;
  quantity: number;
  portion: "full" | "half";
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, quantity: number, portion: "full" | "half") => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "food-cart-items";
const CART_TIMESTAMP_KEY = "food-cart-timestamp";
const CART_EXPIRY_HOURS = 2;

const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    const savedTimestamp = localStorage.getItem(CART_TIMESTAMP_KEY);
    
    if (!savedCart || !savedTimestamp) return [];
    
    const timestamp = parseInt(savedTimestamp);
    const now = Date.now();
    const hoursElapsed = (now - timestamp) / (1000 * 60 * 60);
    
    if (hoursElapsed > CART_EXPIRY_HOURS) {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CART_TIMESTAMP_KEY);
      return [];
    }
    
    return JSON.parse(savedCart);
  } catch (error) {
    console.error("Error loading cart from storage:", error);
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    if (!localStorage.getItem(CART_TIMESTAMP_KEY)) {
      localStorage.setItem(CART_TIMESTAMP_KEY, Date.now().toString());
    }
  } catch (error) {
    console.error("Error saving cart to storage:", error);
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCartFromStorage);

  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const addToCart = (item: MenuItem, quantity: number, portion: "full" | "half") => {
    setCartItems((prev) => [...prev, { item, quantity, portion }]);
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((cartItem, i) =>
        i === index ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(CART_TIMESTAMP_KEY);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, cartItem) => {
      const price = cartItem.portion === "half" && cartItem.item.half
        ? cartItem.item.half
        : cartItem.item.price;
      return total + price * cartItem.quantity;
    }, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
