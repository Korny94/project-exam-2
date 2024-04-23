import styled from "styled-components";
import { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import AddToCart from "../../Components/AddToCart/AddToCart";
import star from "../../assets/star.png";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import wifi from "../../assets/wifi.png";
import parking from "../../assets/parking.png";
import pets from "../../assets/pets.png";
import breakfast from "../../assets/breakfast.png";
import noImage from "../../assets/noImage.png";
import maxGuests from "../../assets/maxGuests.png";
import location from "../../assets/location.png";
import React from "react";
import Modal from "@mui/material/Modal";

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

const StyledDiv3 = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledModal = styled.div`
  width: 80vw;
  max-width: 400px;
  background-color: white;
  margin: 1rem auto;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
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
  box-shadow: 0px 0px 20px 2px #1f4c65;

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
  margin: -1rem 2rem 2rem 2rem;
  align-items: center;
`;

const StyledPrice = styled.div`
  max-width: 150px;
  overflow: auto;
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
  margin-bottom: 0.3rem;
`;

const StyledRating = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;

  @media (min-width: 768px) {
    margin-left: 2rem;
  }
`;

const StyledMeta = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 70px;
`;

const StyledLocation = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 50px;
  cursor: pointer;
  margin: -1rem 0 1rem;
  width: 175%;
  opacity: 0.8;
`;

const StyledIcon = styled.img`
  width: 25px;
`;

const StyledMetaP = styled.p`
  font-size: 1.3rem;
  margin: 0;
`;

const StyledMetaDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
`;

const StyledMetaDiv2 = styled.div`
  margin: -1rem 0 0 1.5rem;

  @media (min-width: 768px) {
    margin-left: 4rem;
  }
`;

const StyledH6 = styled.h6`
  margin: 0;
`;

function Product() {
  const product = JSON.parse(localStorage.getItem("productInfo"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [productInfo, setProductInfo] = useState(null);
  const isImage = product.media[0].url !== null || product.media[0].url !== "";
  const [imageLoaded, setImageLoaded] = useState(false);
  ScrollToTop();

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const checkNullOrEmpty = (str) => {
    return str !== "" && str != null;
  };

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
          <StyledMetaDiv>
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

            {productInfo.rating > 0 && (
              <StyledRating>
                <StyledH6>{productInfo.rating.toFixed(1)}</StyledH6>
                <StyledStar src={star} alt="Star" />
              </StyledRating>
            )}
            <StyledMetaDiv2>
              <StyledMeta>
                <StyledIcon src={maxGuests} alt="Max Guests" />
                <StyledMetaP>Guests: {productInfo.maxGuests}</StyledMetaP>
              </StyledMeta>
              <StyledMeta>
                <StyledIcon src={wifi} alt="Wifi" />
                <StyledMetaP>
                  Wifi: {productInfo.meta.wifi ? "Yes" : "No"}
                </StyledMetaP>
              </StyledMeta>
              <StyledMeta>
                <StyledIcon src={parking} alt="Parking" />
                <StyledMetaP>
                  Parking: {productInfo.meta.parking ? "Yes" : "No"}
                </StyledMetaP>
              </StyledMeta>
              <StyledMeta>
                <StyledIcon src={pets} alt="Pets" />
                <StyledMetaP>
                  Pets: {productInfo.meta.pets ? "Yes" : "No"}
                </StyledMetaP>
              </StyledMeta>
              <StyledMeta>
                <StyledIcon src={breakfast} alt="Breakfast" />
                <StyledMetaP>
                  Breakfast: {productInfo.meta.breakfast ? "Yes" : "No"}
                </StyledMetaP>
              </StyledMeta>
            </StyledMetaDiv2>
          </StyledMetaDiv>

          <StyledDiv2>
            <StyledDiv3>
              <StyledH2>
                {productInfo.name.charAt(0).toUpperCase() +
                  productInfo.name.slice(1)}
              </StyledH2>
            </StyledDiv3>

            <StyledProductInfo>
              <StyledDiscount>
                <AddToCart product={productInfo} />
                <StyledPrice>{productInfo.price},-</StyledPrice>
              </StyledDiscount>

              <StyledLocation onClick={handleOpen}>
                <StyledIcon src={location} alt="Location" />
                <StyledMetaP>View location</StyledMetaP>
              </StyledLocation>

              <StyledParagraph>
                {productInfo.description.charAt(0).toUpperCase() +
                  productInfo.description.slice(1)}
              </StyledParagraph>
            </StyledProductInfo>
          </StyledDiv2>

          <Modal
            style={{ overflow: "scroll" }}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <StyledModal>
              <p>
                <strong>Address: </strong>
                {checkNullOrEmpty(productInfo.location.address) &&
                  capitalizeFirstLetter(
                    productInfo.location.address.toLowerCase()
                  )}
              </p>
              <p>
                <strong>City: </strong>
                {checkNullOrEmpty(productInfo.location.city) &&
                  capitalizeFirstLetter(
                    productInfo.location.city.toLowerCase()
                  )}
              </p>

              <p>
                <strong>Postal Code: </strong>
                {productInfo.location.zip}
              </p>
              <p>
                <strong>Country: </strong>
                {checkNullOrEmpty(productInfo.location.country) &&
                  capitalizeFirstLetter(
                    productInfo.location.country.toLowerCase()
                  )}
              </p>
            </StyledModal>
          </Modal>
        </>
      ) : (
        <Loader />
      )}
    </StyledDiv>
  );
}

export default Product;
