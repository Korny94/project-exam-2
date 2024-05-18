import logOut from "../../assets/logOut.png";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledLogoutBtn = styled.img`
  width: 30px;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  cursor: pointer;
`;

function Logout() {
  const Navigate = useNavigate();

  const handleLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("key");
      localStorage.removeItem("profile");
      Navigate("/");
    }, 500);
  };
  return (
    <StyledLogoutBtn
      onClick={handleLogout}
      src={logOut}
      alt="Log Out"
      title="Log out"
    />
  );
}

export default Logout;
