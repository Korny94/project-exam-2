import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Product from "./pages/Product/Product.jsx";
import Cart from "./pages/ShoppingCart/ShoppingCart.jsx";
import RouteNotFound from "./pages/RouteNotFound/RouteNotFound.jsx";
import Layout from "./Components/Layouts/Layout.jsx";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Update cart count when component mounts
    const cartCount = document.getElementById("cartCount");
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      cartCount.innerHTML = cart.length;
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
