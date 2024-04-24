import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Product from "./pages/Product/Product.jsx";
import RouteNotFound from "./pages/RouteNotFound/RouteNotFound.jsx";
import Layout from "./Components/Layouts/Layout.jsx";
import CheckoutSuccess from "./pages/CheckoutSuccess/CheckoutSuccess.jsx";
import Profile from "./pages/Profile/Profile.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="product" element={<Product />} />
          <Route path="checkoutSuccess" element={<CheckoutSuccess />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
