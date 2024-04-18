import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "../services/cartService";
import { useUser } from "./UserContext";

export const ShopContext = createContext();
export const useShop = () => useContext(ShopContext);
export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const { userDetails } = useUser();

  useEffect(() => {
    // Function to calculate total quantity whenever cart items change
    const calculateTotalQuantity = () => {
      let totalQuantity = 0;
      for (const _id in cartItems) {
        totalQuantity += cartItems[_id][0];
      }
      return totalQuantity;
    };

    // Update total quantity whenever cart items change
    const totalQuantity = calculateTotalQuantity();

    // Update total quantity whenever cart items change
    setTotalQuantity(totalQuantity);
  }, [cartItems]);

  const addToCart = (item, qty = 1) => {
    if (cartItems.hasOwnProperty(item._id)) {
      setCartItems((prev) => ({
        ...prev,
        [item._id]: [prev[item._id][0] + qty, item],
      }));
    } else {
      setCartItems((prev) => ({ ...prev, [item._id]: [qty, item] }));
    }
  };

  const removeFromCart = (itemID) => {
    const items = { ...cartItems };
    delete items[itemID];
    setCartItems(items);
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      const updateItem = cartItems[id][1];
      setCartItems((prev) => ({ ...prev, [id]: [quantity, updateItem] }));
    }
  };

  const removeAllFromCart = () => {
    setCartItems({});
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        totalQuantity,
        removeAllFromCart,
        setCartItems,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
