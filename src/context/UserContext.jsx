import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    const userAddress = localStorage.getItem("userAddress");
    const isAuthenticated = localStorage.getItem("authenticated");
    const isAdmin = localStorage.getItem("isAdmin");

    if (userEmail && userName && userAddress && isAuthenticated) {
      setUserDetails({
        email: userEmail,
        name: userName,
        address: userAddress,
        userId: userId,
        isAdmin: isAdmin,
      });
      setAuthenticated(isAuthenticated === "true");
      <Navigate to="/" replace />;
    }
  }, []);

  const login = (details) => {
    const { email, name, address, _id, isAdmin } = details;
    // make api call to authenticate user

    // Save user details to localStorage
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
    localStorage.setItem("userAddress", address);
    localStorage.setItem("authenticated", true);
    localStorage.setItem("userId", _id);
    localStorage.setItem("isAdmin", isAdmin);
    setUserDetails({ email, name, address, userId: _id, isAdmin });
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.clear(); // Clear all localStorage data
    setUserDetails(null);
    setAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ userDetails, authenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
