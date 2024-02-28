import styled from "styled-components";
import ShoppingCartCard from "./ShoppingCartCard.jsx";
import "./ShoppingCart.scss";
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop.jsx";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  min-width: 380px;
  gap: 3rem;
  align-items: center;
  overflow-y: scroll;
  height: 70vh;
  padding-top: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    height: 40vh;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledTotal = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #1f4c6520;
  color: white;
  width: 40vw;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 1rem;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledDiv = styled.div`
  display: flex;
  margin-top: 3.5rem;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: 70vh;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const StyledP = styled.p`
  font-size: 1.5rem;
  color: white;
`;

function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  ScrollToTop();
  // Memoize the products array to prevent the useEffect dependency warning
  const products = useMemo(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart;
  }, []);

  // Calculate total price whenever products change
  useEffect(() => {
    let total = 0;
    products.forEach((product) => {
      total += product.discountedPrice || 0;
    });
    setTotalPrice(total);
  }, [products]);

  // Check if the cart is empty when the component mounts
  useEffect(() => {
    setIsCartEmpty(products.length === 0);
  }, []);

  // Create an object to store unique products and their quantities
  const uniqueProducts = {};
  products.forEach((product) => {
    if (!uniqueProducts[product.id]) {
      uniqueProducts[product.id] = { ...product, quantity: 1 };
    } else {
      uniqueProducts[product.id].quantity += 1;
    }
  });

  const emptyCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    setTotalPrice(0);
    setIsCartEmpty(true);
    document.getElementById("cartCount").innerHTML = 0;
  };

  return (
    <StyledDiv>
      <StyledTotal>
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
        {!isCartEmpty && (
          <>
            <div>
              <Link to="/checkoutSuccess" className="checkoutBtn">
                <span className="text">Checkout</span>
              </Link>
            </div>
            <button
              className="deleteBtn"
              onClick={emptyCart}
              title="Empty Cart"
            >
              <svg viewBox="0 0 448 512" className="svgIcon">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
              </svg>
            </button>
          </>
        )}
      </StyledTotal>

      {isCartEmpty ? (
        <StyledP className="">Your cart is empty</StyledP>
      ) : (
        <StyledContainer>
          {/* Render a ShoppingCartCard component for each unique product */}
          {Object.values(uniqueProducts).map((product) => (
            <ShoppingCartCard
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              key={product.id}
              product={product}
            />
          ))}
        </StyledContainer>
      )}
    </StyledDiv>
  );
}

export default Cart;
