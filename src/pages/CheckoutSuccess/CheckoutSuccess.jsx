import Loader from "../../Components/Loader/Loader";
import { useState } from "react";
import styled from "styled-components";
import "./CheckoutSuccess.scss";
import homeBtn from "../../assets/logo.png";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`;

const StyledImg = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 250px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

function CheckoutSuccess() {
  const [loader, setLoader] = useState(true);
  function clearCart() {
    localStorage.setItem("cart", JSON.stringify([]));
    const cartCount = document.getElementById("cartCount");
    if (cartCount.innerHTML !== 0) {
      cartCount.innerHTML = 0;
    }
    setInterval(() => {
      setLoader(false);
    }, 1500);
  }
  clearCart();
  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <StyledDiv>
          <Link to="/">
            <div className="thankCard">
              <b>
                <StyledContent>
                  <h1>Thank you for your purchase!</h1>
                  <h3>
                    Your order has been placed successfully. You will receive an
                    email confirmation shortly.
                  </h3>
                  <StyledImg src={homeBtn} alt="Home Button" />
                </StyledContent>
              </b>
            </div>
          </Link>
        </StyledDiv>
      )}
    </>
  );
}

export default CheckoutSuccess;
