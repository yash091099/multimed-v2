// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize isLoggedIn state from local storage and check for the "id" field
    const userInfoString = localStorage.getItem("userInfo");
    console.log("userInfoString", userInfoString);
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      console.log("userInfo", userInfo);
      return !!userInfo?.id; // Check if "id" field exists and is truthy
    }
    return false; // Default to not logged in if no userinfo is found
  });

  // Function to set isLoggedIn state and update local storage
  const setLoggedInStatus = (status) => {
    setIsLoggedIn(status);
  };

  useEffect(() => {
    // You can add additional logic here, e.g., check if the user's session is still valid
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedInStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
