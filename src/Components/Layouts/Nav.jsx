import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useState and useEffect
import logo from "../../assets/logo.png";
import shoppingCart from "../../assets/shoppingCart.png";
import contact from "../../assets/contact.png";

const StyledNavItems = styled.div`
  position: relative;
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
    scale: 1.5;
  }

  &:hover {
    background: rgb(2, 29, 78);
    background: linear-gradient(
      270deg,
      rgba(2, 29, 78, 0.681) 0%,
      rgba(31, 215, 232, 0.873) 200%
    );
    border-radius: 15px;
    color: rgb(4, 4, 38);
  }
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 2rem 1rem 1rem 1rem;
`;

const StyledCartCount = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px; // Adjust the font size to fit within the smaller count container
`;

function Nav() {
  const [cartCount, setCartCount] = useState(0); // State to manage cart count

  useEffect(() => {
    // Update cart count when component mounts and when cart changes
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setCartCount(cart.length);
    }
  }, []); // Empty dependency array to run the effect only once

  return (
    <StyledNav>
      <StyledNavItems to="/">
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
          {/* Display cart count */}
          <StyledCartCount id="cartCount">{cartCount}</StyledCartCount>
          <img
            src={shoppingCart}
            className="navIcon shoppingCart"
            title="Shopping Cart"
            alt="shoppingCart"
          />
        </Link>
      </StyledNavItems>
    </StyledNav>
  );
}

export default Nav;
