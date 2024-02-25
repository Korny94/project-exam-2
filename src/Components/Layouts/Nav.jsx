import styled from "styled-components";
import { Link } from "react-router-dom";
import Search from "./Search/Search.jsx";
import logo from "../../assets/logo.png";
import shoppingCart from "../../assets/shoppingCart.png";
import contact from "../../assets/contact.png";

const StyledNavItems = styled.div`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.2rem;
  border: none;
  outline: none;
  border-radius: 30px;
  cursor: pointer;
  background-color: rgb(14, 14, 26);
  transition: 0.6s;
  box-shadow: 0px 0px 60px #1f4c65;
  -webkit-box-reflect: below 10px
    linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));

  &:active {
    scale: 0.92;
  }

  &:hover {
    background: rgb(2, 29, 78);
    background: linear-gradient(
      270deg,
      rgba(2, 29, 78, 0.681) 0%,
      rgba(31, 215, 232, 0.873) 200%
    );
    color: rgb(4, 4, 38);
  }
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 2rem 1rem 1rem 1rem;
`;

function Nav() {
  return (
    <StyledNav>
      <StyledNavItems>
        <Link to="/">
          <img src={logo} title="Home" className="navIcon" alt="logo" />
        </Link>
      </StyledNavItems>
      <StyledNavItems>
        <Link to="/contact">
          <img
            src={contact}
            className="navIcon"
            title="Contact"
            alt="contact"
          />
        </Link>
      </StyledNavItems>
      <StyledNavItems>
        <Link to="/cart">
          <img
            src={shoppingCart}
            className="navIcon shoppingCart"
            title="Shopping Cart"
            alt="shoppingCart"
          />
        </Link>
      </StyledNavItems>
      <Search />
    </StyledNav>
  );
}

export default Nav;
