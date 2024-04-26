import React, { useState, useEffect } from "react";
import "./Search.scss";
import styled from "styled-components";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";
const API_ALL_VENUES = process.env.REACT_APP_API_ALL_VENUES;

const StyledP = styled.p`
  font-size: 1.5rem;
  color: white;
  position: absolute;
  top: 45%;
  left: 40%;
`;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 7rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 200px;
  z-index: 10;
  position: absolute;
  margin-top: 1rem;
`;

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    // Fetch products from the API
    fetch(`${API_ALL_VENUES}?_bookings=true`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
        setFilteredSuggestions(data.data); // Initialize filteredSuggestions with all products
        for (let i = 0; i < data.data.length; i++) {
          console.log(data.data[i].media[0]);
        }
        console.log(data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setFetchError(true);
      });
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    // Filter products based on the input value
    const filteredProducts = products.filter((product) => {
      const { name, description } = product;
      return (
        name.toLowerCase().includes(inputValue.toLowerCase()) ||
        description.toLowerCase().includes(inputValue.toLowerCase())
      );
    });

    // Update the filtered suggestions state with filtered products
    setFilteredSuggestions(
      inputValue.trim() === "" ? products : filteredProducts
    );
    setShowSuggestions(inputValue.trim() !== "");
  };

  const handleBlur = () => {
    // Hide suggestions when the StyledDiv loses focus
    setTimeout(() => {
      setShowSuggestions(false);
    }, 300);
  };

  const handleSuggestionClick = (name) => {
    setSearchInput(name); // Set the search input value to the clicked suggestion
    handleInputChange({ target: { value: name } }); // Manually trigger handleInputChange
    setShowSuggestions(false); // Hide suggestions after clicking on a suggestion
  };

  return (
    <>
      {fetchError && alert("Error fetching products. Please try again.")}
      {products.length === 0 && !fetchError && <Loader />}

      <StyledDiv onBlur={handleBlur}>
        <form className="form">
          <label htmlFor="search">
            <input
              className="input"
              type="text"
              required=""
              placeholder="Search.."
              id="search"
              value={searchInput}
              onChange={handleInputChange}
              autoComplete="off" // Disable autocomplete
            />
            <div className="fancy-bg"></div>
            <div className="search">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
              >
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
            </div>
          </label>
        </form>
        {/* Display suggestions */}
        {showSuggestions && searchInput && (
          <ul className="suggestions">
            {filteredSuggestions.length === 0 ? (
              <li>No products found...</li>
            ) : (
              filteredSuggestions.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleSuggestionClick(product.name)}
                >
                  {product.name}
                </li>
              ))
            )}
          </ul>
        )}
      </StyledDiv>

      <StyledContainer>
        {searchInput.trim() === "" ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : filteredSuggestions.length === 0 ? (
          <StyledP>No products found...</StyledP>
        ) : (
          filteredSuggestions.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </StyledContainer>
    </>
  );
}

export default Search;
