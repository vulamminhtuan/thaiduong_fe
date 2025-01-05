import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    jwt: localStorage.getItem("jwt") || null,
    user: null,
  });

  useEffect(() => {
    if (auth.jwt) {
      try {
        const decoded = jwtDecode(auth.jwt);
        console.log('Decoded jwt:', decoded); 
        setAuth((prev) => ({ ...prev, user: decoded }));
      } catch (err) {
        console.error('Invalid jwt:', err);
        setAuth({ jwt: null, user: null });
        localStorage.removeItem("jwt");
      }
    }
  }, [auth.jwt]);

  const logout = () => {
    setAuth({ jwt: null, user: null });
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
