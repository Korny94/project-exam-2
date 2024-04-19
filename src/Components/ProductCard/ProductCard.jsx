import "./ProductCard.scss";
import React from "react";
import AddToCart from "../AddToCart/AddToCart.jsx";
import styled from "styled-components";
import { Link } from "react-router-dom";
import starRating from "../../assets/star.png";
import { useState } from "react";

const StyledImg = styled.img`
  width: 95%;
  height: 95%;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
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

const StyledRating = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  margin-top: -250px;
  margin-left: 300px;

  @media (max-width: 399px) {
    margin-left: 280px;
    margin-top: -240px;
  }
`;

const StyledRatingP = styled.p`
  position: absolute;
  color: white;
  font-weight: 600;
  z-index: 1;
`;

const StyledSale = styled.div`
  position: absolute;
  background-color: red;
  color: white;
  padding: 0.5rem;
  margin-top: -210px;
  margin-left: -250px;
  border-radius: 5px;

  @media (max-width: 399px) {
    margin-left: -220px;
  }
`;

function ProductCard({ product }) {
  const isStarRating = product.rating > 0;

  const getProductInfo = (product) => {
    localStorage.setItem("productInfo", JSON.stringify(product));
  };

  return (
    <div className="card">
      <div className="card2">
        <Link to="/product" onClick={() => getProductInfo(product)}>
          <StyledLink>
            {isStarRating && (
              <StyledRating>
                <StyledRatingP>{product.rating}</StyledRatingP>
                <img src={starRating} className={"starRating"} alt="Rating" />
              </StyledRating>
            )}
            <StyledImg src={product.media[0].url} alt="Product" />
          </StyledLink>
        </Link>

        <StyledFooter>
          <Link to="/product">
            <StyledDiv>
              <div>{product.title}</div>
              <div>{product.price},-</div>
            </StyledDiv>
          </Link>
          <AddToCart product={product} />
        </StyledFooter>
      </div>
    </div>
  );
}

export default ProductCard;
