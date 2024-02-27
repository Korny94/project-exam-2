import Loader from "../../Components/Loader/Loader";
import { useState } from "react";
import styled from "styled-components";
import "./CheckoutSuccess.scss";

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
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
    }, 2000);
  }
  clearCart();
  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <StyledDiv>
          <div className="thankCard">
            <b>
              <h1>Thank you for your purchase!</h1>
              <h3>
                Your order has been placed successfully. You will receive an
                email confirmation shortly.
              </h3>
            </b>
          </div>
        </StyledDiv>
      )}
    </>
  );
}

export default CheckoutSuccess;
