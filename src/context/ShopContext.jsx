import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "../services/cartService";
import { useUser } from "./UserContext";

export const ShopContext = createContext();
export const useShop = () => useContext(ShopContext);
export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState();

  const removeAllFromCart = () => {
    setCartItems();
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,

        removeAllFromCart,
        setCartItems,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
