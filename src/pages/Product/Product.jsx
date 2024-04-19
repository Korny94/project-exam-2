import styled from "styled-components";
import { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import AddToCart from "../../Components/AddToCart/AddToCart";
import star from "../../assets/star.png";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

const StyledDiv = styled.div`
  color: white;
  font-size: 2rem;
  display: flex;
  margin-top: 3rem;
  justify-content: space-evenly;
  width: 95vw;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledProductInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 80%;
    margin-top: 3rem;
`;

const StyledImg = styled.img`
  width: 60vw;
  height: 60vw;
  min-width: 280px;
  min-height: 280px;
  max-width: 400px;
  max-height: 400px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 2rem;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const StyledSale = styled.div`
  background-color: red;
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  font-size: 1.1rem;
`;

const StyledParagraph = styled.p`
font-size: 1.5rem;
  width: 85%;
  margin: 0;
  margin-bottom: 3rem;
  text-align: center;

  @media (max-width: 768px) {
    width: 85%;
    font-size: 1.3rem;
  }

  @media (max-width: 499px) {
    width: 95%;
`;

const StyledLine = styled.div`
  position: absolute;
  border: 1.5px solid red;
  border-radius: 50px;
  width: 120px;
  margin-top: 50px;
  margin-left: -13px;
  rotate: -5deg;
`;

const StyledLineDiv = styled.div`
  width: 120px;
  height: 50px;
`;

const StyledDiscount = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: -1rem;
  align-items: center;
`;

const DiscountH4 = styled.h4`
  opacity: 0.5;
  font-size: 1.7rem;
`;

const StyledH4 = styled.h4`
  font-size: 1.7rem;
`;

const StyledH2 = styled.h2`
  margin-top: 0;

  @media (max-width: 1000px) {
    font-size: 2.4rem;
  }

  @media (max-width: 499px) {
    font-size: 1.8rem;
    margin-bottom: 2.5rem;
  }
`;

const StyledStar = styled.img`
  width: 25px;
  height: 25px;
  filter: drop-shadow(0 0 8px #ffffff46);
`;

const StyledRating = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const StyledReview = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const StyledReviewText = styled.p`
  margin: 0;
  opacity: 0.6;
  font-size: 1.5rem;
`;

const StyledUser = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const StyledOrice = styled.h4`
  margin-top: 0.1rem;
`;

function Product() {
  const [productInfo, setProductInfo] = useState(null);
  ScrollToTop();
  useEffect(() => {
    // Simulate fetching product info from localStorage after 100ms
    const timeoutId = setTimeout(() => {
      const info = JSON.parse(localStorage.getItem("productInfo"));
      setProductInfo(info);
    }, 100);

    // Clear the timeout when the component unmounts or when productInfo is set
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array to run the effect only once

  return (
    <StyledDiv>
      {productInfo ? (
        <>
          <StyledImg src={productInfo.media[0].url} alt="Product" />

          <StyledProductInfo>
          {productInfo.rating > 0 && (
              <StyledRating>
                <div>{productInfo.rating} / 5</div>
                <StyledStar src={star} alt="Star" />
              </StyledRating>
            )}
            <StyledH2>{productInfo.title}</StyledH2>
              <>
                <StyledDiscount>
                  <AddToCart product={productInfo} />
                  <StyledH4>{productInfo.price},-</StyledH4>
                </StyledDiscount>
              </>

            <StyledParagraph>{productInfo.description} </StyledParagraph>


          </StyledProductInfo>
        </>
      ) : (
        <Loader />
      )}
    </StyledDiv>
  );
}

export default Product;
