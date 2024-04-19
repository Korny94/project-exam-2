import "./ShoppingCartCard.scss";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const StyledBtn = styled.button`
  color: white;
  background-color: black;
  box-shadow: 0px 0px 6px 4px #1f4c65;
  border-radius: 50%;
  font-size: 1.5rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledPrice = styled.p`
  position: absolute;
  margin-top: 135px;
  margin-left: 235px;
`;

function ShoppingCartCard({ product, totalPrice, setTotalPrice, productInfo }) {
  const [productNumber, setProductNumber] = useState(1);
  const cartCount = document.getElementById("cartCount");

  // Set the initial product number when the component mounts
  useEffect(() => {
    setProductNumber(product.quantity || 1);
  }, [product.quantity]);

  function increment() {
    setProductNumber(productNumber + 1);
    cartCount.textContent = parseInt(cartCount.textContent) + 1;
    const productsCart = JSON.parse(localStorage.getItem("cart"));
    productsCart.push(product);
    localStorage.setItem("cart", JSON.stringify(productsCart));
    setTotalPrice(totalPrice + product.price);
  }

  function decrement() {
    if (productNumber > 0) {
      setProductNumber(productNumber - 1);
      const productsCart = JSON.parse(localStorage.getItem("cart"));
      const index = productsCart.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        const updatedCart = [
          ...productsCart.slice(0, index),
          ...productsCart.slice(index + 1),
        ];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      setTotalPrice(totalPrice - product.price);
      cartCount.textContent = parseInt(cartCount.textContent) - 1;
    }
  }

  return (
    <div className="container">
      <div className="box">
        <Link to="/product" className="title">
          {product.name}
        </Link>

        <StyledDiv>
          <img
            src={product.media[0].url}
            alt={product.title + "Product Image"}
            className="productImage"
          />
          <StyledBtn
            id={product.id + "decrement"}
            className="decrement"
            onClick={decrement}
          >
            -
          </StyledBtn>
          <h2 className="productNumber">{productNumber}</h2>
          <StyledBtn id={product.id + "increment"} onClick={increment}>
            +
          </StyledBtn>
        </StyledDiv>
        <StyledPrice>{product.price},-</StyledPrice>
      </div>
    </div>
  );
}

export default ShoppingCartCard;
