import React, { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const API_REGISTER = process.env.REACT_APP_API_REGISTER;
const API_LOGIN = process.env.REACT_APP_API_LOGIN;
const CREATE_KEY = process.env.REACT_APP_API_CREATE_KEY;
console.log(API_REGISTER, API_LOGIN, CREATE_KEY);

const StyledDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 90vw;
  margin: 1rem auto;
`;

const StyledH2 = styled.h2`
  color: white;
  font-size: 2rem;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const StyledBox = styled(Box)`
  display: ${(props) => (props.disabled ? "none" : "block")};
`;

const StyledTextField = styled(TextField)`
  background-color: white;
  border-radius: 5px;
`;

const StyledDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  align-items: center;
  margin: 0 auto;
  gap: 0.75rem;
`;

const StyledDiv3 = styled.div`
  display: flex;
  align-items: center;
`;

function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [venueManager, setVenueManager] = useState(false);
  const navigate = useNavigate();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false); // Ensure only the clicked one is active
  };

  const handleRegisterClick = () => {
    setShowLogin(false); // Ensure only the clicked one is active
    setShowRegister(true);
  };

  const handleLogin = () => {
    // Regular expression to match email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the allowed pattern
    if (!emailRegex.test(email)) {
      // Email is invalid, show an error message or handle it accordingly
      alert("Invalid email address");
      return; // Exit early if the email is invalid
    }

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      // Password is too short, show an error message or handle it accordingly
      alert("Password must be at least 8 characters long");
      return; // Exit early if the password is too short
    }

    // Perform login logic here if all checks pass

    // Create a new user object
    const user = {
      email: email,
      password: password,
    };

    // Send the user object to the API
    fetch(API_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.errors) {
          // Handle the error response here
          alert(data.errors[0].message);
          return; // Exit early if there's an error
        } else {
          // Handle the API response here
          localStorage.setItem("user", JSON.stringify(data.data));

          // Create a new key object
          const key = {
            name: data.data.name,
          };

          // Send the key object to the API
          fetch(CREATE_KEY, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.data.accessToken}`,
            },
            body: JSON.stringify(key),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              localStorage.setItem("key", JSON.stringify(data.data));
              navigate("/profile");
            })
            .catch((error) => {
              console.error("Error creating key:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        // Handle any errors here
      });
  };

  const handleRegister = () => {
    // Regular expression to match name without punctuation symbols apart from underscore
    const nameRegex = /^[A-Za-z0-9_]+$/;

    // Check if the name matches the allowed pattern
    if (!nameRegex.test(regName)) {
      // name contains invalid characters, show an error message or handle it accordingly
      alert("name must not contain symbols apart from underscore (_)");
      return; // Exit early if the name is invalid
    }

    // Regular expression to match email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the allowed pattern
    if (!emailRegex.test(regEmail)) {
      // Email is invalid, show an error message or handle it accordingly
      alert("Invalid email address");
      return; // Exit early if the email is invalid
    }

    // Check if the password is at least 8 characters long
    if (regPassword.length < 8) {
      // Password is too short, show an error message or handle it accordingly
      alert("Password must be at least 8 characters long");
      return; // Exit early if the password is too short
    }

    // Check if the password and confirm password match
    if (regPassword !== regConfirmPassword) {
      // Passwords don't match, show an error message or handle it accordingly
      alert("Passwords do not match");
      return; // Exit early if the passwords don't match
    }

    // Perform registration logic here if all checks pass
    console.log(regName, regEmail, regPassword, regConfirmPassword);

    // Create a new user object
    const newUser = {
      name: regName,
      email: regEmail,
      password: regPassword,
      venueManager: venueManager, // Set to true if the user wants to be a venue manager
    };

    // Send the new user object to the API
    fetch(API_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.errors) {
          // Handle the error response here
          alert(data.errors[0].message);
          return; // Exit early if there's an error
        } else {
          setShowLogin(true);
          setShowRegister(false); // Ensure only the clicked one is active
          alert("User registered successfully, please log in");
        }
        // Handle the API response here
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        // Handle any errors here
      });
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
      <StyledBox
        disabled={!showLogin}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <StyledDiv2>
          <StyledTextField
            required
            id="outlined-required"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            required
            id="outlined-password-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ padding: ".5rem 4rem", margin: ".5rem 0 0" }}
            onClick={handleLogin}
          >
            Log in
          </Button>
        </StyledDiv2>
      </StyledBox>
      <StyledBox
        disabled={!showRegister}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <StyledDiv2>
          <StyledTextField
            required
            id="outlined-required"
            placeholder="Name"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
          />
          <StyledTextField
            required
            id="outlined-required"
            placeholder="Email@stud.noroff.no"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
          />
          <StyledTextField
            required
            id="outlined-password-input"
            type="password"
            placeholder="Password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />
          <StyledTextField
            required
            id="outlined-password-input"
            type="password"
            placeholder="Confirm Password"
            value={regConfirmPassword}
            onChange={(e) => setRegConfirmPassword(e.target.value)}
          />
          <StyledDiv3>
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
              sx={{ color: "white" }}
              onChange={(e) => setVenueManager(e.target.checked)}
            />
            <p style={{ color: "white" }}>Be a Venue Manager</p>
            <HelpOutlineIcon
              title="Hi"
              sx={{ color: "white", marginLeft: ".5rem" }}
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            />
            <div>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: "none",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>
                  Become a venue manager and create own venues and more!
                </Typography>
              </Popover>
            </div>
          </StyledDiv3>
          <Button
            variant="contained"
            sx={{ padding: ".5rem 4rem", margin: ".5rem 0 0" }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </StyledDiv2>
      </StyledBox>
    </>
  );
}

export default Login;
