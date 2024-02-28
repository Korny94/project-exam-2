import styled from "styled-components";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop.jsx";

const StyledDiv = styled.div`
  font-size: 2rem;
  color: white;
  width: 95vw;
  margin: 8rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function RouteNotFound() {
  ScrollToTop();
  return <StyledDiv>Page not found..</StyledDiv>;
}

export default RouteNotFound;
