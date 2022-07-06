import ResetCSS from "../assets/ResetCSS";
import GlobalStyle from "../assets/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useState } from "react";
import Products from "./Products";


export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <UserContext.Provider value={{ cart, setCart }}>
      <BrowserRouter>
        <ResetCSS />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
