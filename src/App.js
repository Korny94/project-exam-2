import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Nav />
    </header>
  );
}

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

function Home() {
  return <div>Home</div>;
}

function Products() {
  return <div>Products</div>;
}

function Contact() {
  return <div>Contact</div>;
}

function RouteNotFound() {
  return <div>Route not found</div>;
}

function Footer() {
  return <footer>Footer</footer>;
}

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<RouteNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
