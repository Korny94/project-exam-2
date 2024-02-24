import styled from "styled-components";
import React, { useState, useEffect } from "react";

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 1rem 0;
  color: white;
`;

function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      const newYear = new Date().getFullYear();
      if (newYear !== currentYear) {
        setCurrentYear(newYear);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentYear]);
  return <StyledFooter>© {currentYear}</StyledFooter>;
}

export default Footer;
