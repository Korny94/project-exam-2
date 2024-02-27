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
`;

// function ProductCard({ product }) {
//   const onSale = product.discountedPrice < product.price; // Determine if the product is on sale
//   const isStarRating = product.rating > 0; // Determine if the product has a rating bigger than 0

//   return (
//     <div className="card">
//       <div className="card2">
//         <Link to="/product">
//           <StyledLink>
//             {onSale && <StyledSale>Sale!</StyledSale>}{" "}
//             {/* Display "Sale" if product is on sale */}
//             {isStarRating && (
//               <StyledRating>
//                 <StyledRatingP>{product.rating}</StyledRatingP>
//                 <img src={starRating} className={"starRating"} alt="Rating" />
//               </StyledRating>
//             )}
//             {/* Display the star rating if the product has a rating bigger than 0 */}
//             <StyledImg src={product.image.url} alt="Product" />
//           </StyledLink>
//         </Link>

//         <StyledFooter>
//           <Link to="/product">
//             <StyledDiv>
//               <div>{product.title}</div>
//               <div>{product.discountedPrice},-</div>
//             </StyledDiv>
//           </Link>
//           <AddToCart product={product} />
//         </StyledFooter>
//       </div>
//     </div>
//   );
// }

function ProductCard({ product }) {
  const onSale = product.discountedPrice < product.price;
  const isStarRating = product.rating > 0;

  const getProductInfo = (product) => {
    localStorage.setItem("productInfo", JSON.stringify(product));
  };

  return (
    <div className="card">
      <div className="card2">
        <Link to="/product" onClick={() => getProductInfo(product)}>
          <StyledLink>
            {onSale && <StyledSale>Sale!</StyledSale>}
            {isStarRating && (
              <StyledRating>
                <StyledRatingP>{product.rating}</StyledRatingP>
                <img src={starRating} className={"starRating"} alt="Rating" />
              </StyledRating>
            )}
            <StyledImg src={product.image.url} alt="Product" />
          </StyledLink>
        </Link>

        <StyledFooter>
          <Link to="/product">
            <StyledDiv>
              <div>{product.title}</div>
              <div>{product.discountedPrice},-</div>
            </StyledDiv>
          </Link>
          <AddToCart product={product} />
        </StyledFooter>
      </div>
    </div>
  );
}

export default ProductCard;
