import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [user, setUser] = useState(null);

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.userId;
      setUser({ ...user, userId });
      const currentTime = Date.now() / 1000;
      return currentTime > payload.exp;
    } catch (e) {
      return true;
    }
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = sessionStorage.getItem("token");
      if (token && isTokenExpired(token)) {
        console.log("Token is expired");
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("token");
      } else if (token) {
        try {
          const response = await axios.get("/mypage", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };

    checkTokenValidity();

    const intervalId = setInterval(checkTokenValidity, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
