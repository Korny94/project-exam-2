import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Product from "./pages/Product/Product.jsx";
import Cart from "./pages/ShoppingCart/ShoppingCart.jsx";
import RouteNotFound from "./pages/RouteNotFound/RouteNotFound.jsx";
import Layout from "./Components/Layouts/Layout.jsx";
import CheckoutSuccess from "./pages/CheckoutSuccess/CheckoutSuccess.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkoutSuccess" element={<CheckoutSuccess />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
