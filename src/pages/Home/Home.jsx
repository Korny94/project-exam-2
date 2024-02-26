import styled from "styled-components";
import ProductCard from "../../Components/ProductCard/ProductCard.jsx";
import Search from "../../Components/Layouts/Search/Search.jsx";

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5rem;
`;

function Home() {
  return (
    <>
      <Search />
      <StyledDiv>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </StyledDiv>
    </>
  );
}

export default Home;
