import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";

function Token() {
  let ApiToken = localStorage.getItem("token") || "";
  if (ApiToken) {
    return jwt_decode(localStorage.getItem("token")) || "";
  }
}

export const AppContext = createContext();
const AuthContext = ({ children }) => {
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let token = Token();
    if (token) {
      setUsername(token.username);
    }
  }, []);

  const handleLogin = (token) => {
    navigate("/");
    setUsername(jwt_decode(token).username);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUsername("");
    navigate("/register");
  };

  return (
    <AppContext.Provider value={{ handleLogOut, handleLogin, username }}>
      {children}
    </AppContext.Provider>
  );
};

export default AuthContext;
