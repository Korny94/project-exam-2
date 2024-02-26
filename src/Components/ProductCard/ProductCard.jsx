import "./ProductCard.scss";
import ProductContent from "./ProductContent.jsx";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader.jsx";

const API_URL = "https://v2.api.noroff.dev/online-shop";

function ProductCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const allProducts = data.data;
        // setProducts(allProducts);
        if (response.ok) {
          setLoading(false);
          console.log(allProducts);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="card">
      <div className="card2">{/* <ProductContent /> */}</div>
    </div>
  );
}

export default ProductCard;
