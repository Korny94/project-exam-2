import "./ProductCard.scss";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import starRating from "../../assets/star.png";
import { useState } from "react";
import wifi from "../../assets/wifi.png";
import parking from "../../assets/parking.png";
import pets from "../../assets/pets.png";
import breakfast from "../../assets/breakfast.png";
import noImage from "../../assets/noImage.png";

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
  width: 92%;
  display: flex;
  justify-content: space-between;
  color: white;
  margin: 0.2rem 0.8rem;
`;

const StyledDiv = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 0.7rem 1rem;
  gap: 1rem;
`;

const StyledIcon = styled.img`
  width: 15px;
  height: 15px;
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
  color: black;
  font-weight: 900;
  z-index: 1;
`;

const StyledH2 = styled.h2`
  font-size: 1.3rem;
  margin: 0;
  max-width: 60%;
  overflow: hidden;
  text-wrap: nowrap;
`;

const StyledPrice = styled.p`
  font-size: 1.3rem;
  margin: 0;
  max-width: 35%;
  overflow: auto;
  color: rgba(255, 255, 255, 0.8);
`;

function ProductCard({ product }) {
  const isWifi = product.meta.wifi === true;
  const isParking = product.meta.parking === true;
  const isPets = product.meta.pets === true;
  const isBreakfast = product.meta.breakfast === true;
  const isImage = product.media[0].url !== null || product.media[0].url !== "";
  const isStarRating = product.rating > 0;
  const [imageLoaded, setImageLoaded] = useState(false);

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
                <StyledRatingP>{product.rating.toFixed(1)}</StyledRatingP>
                <img src={starRating} className={"starRating"} alt="Rating" />
              </StyledRating>
            )}
            {isImage && product.media.length > 0 && (
              <StyledImg
                src={product.media[0].url}
                alt="Product"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(false)}
                style={{ display: imageLoaded ? "inline" : "none" }}
              />
            )}
            {!imageLoaded && (
              <StyledImg
                src={noImage}
                alt="Default Image"
                style={{ display: imageLoaded ? "none" : "inline" }}
              />
            )}
          </StyledLink>
        </Link>

        <Link to="/product">
          <StyledFooter>
            <StyledH2>
              {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
            </StyledH2>

            <StyledPrice>{product.price},-</StyledPrice>
          </StyledFooter>
          <StyledDiv>
            {isWifi && <StyledIcon src={wifi} alt="Wifi" />}
            {isParking && <StyledIcon src={parking} alt="Parking" />}
            {isPets && <StyledIcon src={pets} alt="Pets" />}
            {isBreakfast && <StyledIcon src={breakfast} alt="Breakfast" />}
          </StyledDiv>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
