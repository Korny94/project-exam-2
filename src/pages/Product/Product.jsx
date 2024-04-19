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

const StyledDiv2 = styled.div`
  width: 50%;
  align-items: center;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
`;

const StyledProductInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledImg = styled.img`
  width: 60vw;
  height: 60vw;
  min-width: 300px;
  min-height: 300px;
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 2rem;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const StyledParagraph = styled.p`
  font-size: 1.3rem;
  margin: 0;
  margin-bottom: 3rem;
  width: 175%;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const StyledDiscount = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: -1rem;
  align-items: center;
`;

const StyledH4 = styled.h4`
  font-size: 1.7rem;
`;

const StyledH2 = styled.h2`
  margin-top: 0;
  color: white;

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

          <StyledDiv2>
            <StyledH2>{productInfo.name}</StyledH2>

            <StyledProductInfo>
              <StyledDiscount>
                {productInfo.rating > 0 && (
                  <StyledRating>
                    <h6>{productInfo.rating.toFixed(1)}</h6>
                    <StyledStar src={star} alt="Star" />
                  </StyledRating>
                )}
                <AddToCart product={productInfo} />
                <StyledH4>{productInfo.price},-</StyledH4>
              </StyledDiscount>

              <StyledParagraph>{productInfo.description} </StyledParagraph>
            </StyledProductInfo>
          </StyledDiv2>
        </>
      ) : (
        <Loader />
      )}
    </StyledDiv>
  );
}

export default Product;
