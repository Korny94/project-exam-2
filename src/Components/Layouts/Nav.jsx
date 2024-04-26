import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";

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
    scale: 1.2;
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

function Nav() {
  const navigate = useNavigate(); // Use the useNavigation hook from react-router-dom

  const handleProfileClick = () => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  return (
    <StyledNav>
      <StyledNavItems to="/">
        <Link to="/">
          <img src={logo} title="Home" className="navIcon" alt="logo" />
        </Link>
      </StyledNavItems>

      <StyledNavItems>
        <img
          src={profile}
          className="navIcon"
          title="Profile"
          alt="profile"
          onClick={handleProfileClick}
          style={{ marginBottom: "5px" }}
        />
      </StyledNavItems>
    </StyledNav>
  );
}

export default Nav;
