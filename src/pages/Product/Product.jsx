import styled from "styled-components";
import { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import AddToCart from "../../Components/AddToCart/AddToCart";

const StyledDiv = styled.div`
  color: red;
  font-size: 2rem;
`;

function Product() {
  const [productInfo, setProductInfo] = useState(null);

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
          <div>{productInfo.title}</div>
          <div>{productInfo.description}</div>
          <div>{productInfo.discountedPrice},-</div>
          <div>{productInfo.price},-</div>
          <div>{productInfo.price - productInfo.discountedPrice},-</div>
          <img src={productInfo.image.url} alt="Product" />
          <div>{productInfo.rating}</div>
          <div>productInfo.reviews</div>
          <AddToCart product={productInfo} />

          {/* Render other product info */}
        </>
      ) : (
        <Loader />
      )}
    </StyledDiv>
  );
}

export default Product;
