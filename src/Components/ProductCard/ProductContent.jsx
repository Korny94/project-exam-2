import "./ProductContent.scss";
import AddToCart from "../AddToCart/AddToCart.jsx";
import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";

const StyledImg = styled.img`
  width: 90%;
  height: 80%;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
`;

const StyledLink = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const StyledFooter = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

function ProductContent({ product }) {
  return (
    <Link to="/product">
      <StyledLink>
        <StyledImg src={product.image.url} alt="Product" />
        <StyledFooter>
          <div>{product.title}</div>
          <div>{product.discountedPrice}</div>
          <AddToCart />
        </StyledFooter>
      </StyledLink>
    </Link>
  );
}

export default ProductContent;
