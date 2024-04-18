import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "../services/cartService";
import { useUser } from "./UserContext";

export const ShopContext = createContext();
export const useShop = () => useContext(ShopContext);
export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const { userDetails } = useUser();

  useEffect(() => {
    // Function to calculate total quantity whenever cart items change
    const calculateTotalQuantity = () => {
      let totalQuantity = 0;
      totalQuantity = cartItems?.length;
      return totalQuantity;
    };

    console.log("cartItems from context", cartItems);

    // Update total quantity whenever cart items change
    const totalQuantity = calculateTotalQuantity();

    console.log("totalQuantity from context", totalQuantity);

    // Update total quantity whenever cart items change
    setTotalQuantity(totalQuantity);
  }, [cartItems]);

  const removeAllFromCart = () => {
    setCartItems({});
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,

        totalQuantity,
        removeAllFromCart,
        setCartItems,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
