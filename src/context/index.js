import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Instance } from "../api";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const navigate = useNavigate();
  const [dataUsers, setDataUsers] = useState([]);

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  const removeTokenFromLocalStorage = () => {
    try {
      navigate("/login");
      return localStorage.removeItem("token"), localStorage.removeItem("url");
    } catch (error) {
      console.error(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await Instance.get("/usuarios/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (!token) {
      navigate("/login");
    } else {
      getAllUsers();
    }
  },[])

  const value = {
    getTokenFromLocalStorage,
    removeTokenFromLocalStorage,
    getAllUsers,
    dataUsers,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
