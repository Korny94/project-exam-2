import styled from "styled-components";
import { Link } from "react-router-dom";
import Search from "./Search/Search.jsx";
import logo from "../../assets/logo.png";

const StyledNavItems = styled.div`
  list-style: none;
  font-size: 1.2rem;
  width: 120px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.2rem;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
`;

function Nav() {
  return (
    <StyledNav>
      <StyledNavItems>
        <Link to="/">
          <img src={logo} className="logo" alt="logo" />
        </Link>
        <Link to="/">Name</Link>
      </StyledNavItems>
      <StyledNavItems>
        <Link to="/contact">Contact Icon</Link>
      </StyledNavItems>
      <StyledNavItems>
        <Link to="/cart">Cart Icon</Link>
      </StyledNavItems>
      <Search />
    </StyledNav>
  );
}

export default Nav;
