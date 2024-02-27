import styled from "styled-components";

const StyledDiv = styled.div`
  font-size: 2rem;
  color: white;
  position: absolute;
  top: 45%;
  left: 43%;
`;

function RouteNotFound() {
  return <StyledDiv>Page not found..</StyledDiv>;
}

export default RouteNotFound;
