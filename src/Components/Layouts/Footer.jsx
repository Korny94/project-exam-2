import styled from "styled-components";

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 1rem 0;
  color: white;
`;

function Footer() {
  return <StyledFooter>Footer</StyledFooter>;
}

export default Footer;
