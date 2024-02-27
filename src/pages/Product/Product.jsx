import styled from "styled-components";

const StyledDiv = styled.div`
  color: red;
  font-size: 2rem;
`;

function Product() {
  const productInfo = localStorage.getItem("product");

  return <StyledDiv></StyledDiv>;
}

export default Product;
