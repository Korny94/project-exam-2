import React, { useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 90vw;
  margin: 2rem auto;
`;

const StyledH2 = styled.h2`
  color: white;
  font-size: 2rem;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false); // Ensure only the clicked one is active
  };

  const handleRegisterClick = () => {
    setShowLogin(false); // Ensure only the clicked one is active
    setShowRegister(true);
  };

  return (
    <>
      <StyledDiv>
        <StyledH2 onClick={handleLoginClick} disabled={!showLogin}>
          Login
        </StyledH2>
        <StyledH2>|</StyledH2>
        <StyledH2 onClick={handleRegisterClick} disabled={!showRegister}>
          Register
        </StyledH2>
      </StyledDiv>
    </>
  );
}

export default Login;
