import ResetCSS from "../assets/ResetCSS";
import GlobalStyle from "../assets/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useState } from "react";
import Products from "./Products";
import Login from "./Login";
import SignUp from "./SignUp";
import ShoppingCart from "./ShoppingCart";

export default function App() {
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ cart, setCart, user, setUser }}>
      <BrowserRouter>
        <ResetCSS />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/carrinho" element={<ShoppingCart/>} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
