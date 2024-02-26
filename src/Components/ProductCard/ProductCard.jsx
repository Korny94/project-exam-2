import "./ProductCard.scss";
import React, { useEffect, useState } from "react";
import AddToCart from "../AddToCart/AddToCart.jsx";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledImg = styled.img`
  width: 95%;
  height: 95%;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
`;

const StyledLink = styled.a`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const StyledFooter = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  color: white;
  margin-top: 0.5rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-left: 0.7rem;
`;

function ProductCard({ product }) {
  return (
    <div className="card">
      <div className="card2">
        <Link to="/product">
          <StyledLink>
            <StyledImg src={product.image.url} alt="Product" />
          </StyledLink>
        </Link>

        <StyledFooter>
          <Link to="/product">
            <StyledDiv>
              <div>{product.title}</div>
              <div>{product.price},-</div>
            </StyledDiv>
          </Link>
          <AddToCart />
        </StyledFooter>
      </div>
    </div>
  );
}

export default ProductCard;
