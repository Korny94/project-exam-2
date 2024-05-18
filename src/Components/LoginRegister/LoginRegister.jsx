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
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import PopupMessage from "../../Components/PopupMessage/PopupMessage.jsx";
const API_REGISTER = process.env.REACT_APP_API_REGISTER;
const API_LOGIN = process.env.REACT_APP_API_LOGIN;
const CREATE_KEY = process.env.REACT_APP_API_CREATE_KEY;
const ALL_PROFILES = process.env.REACT_APP_API_ALL_PROFILES;

function LoginRegister() {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [venueManager, setVenueManager] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [regNameError, setRegNameError] = useState(false);
  const [regEmailError, setRegEmailError] = useState(false);
  const [regPasswordError, setRegPasswordError] = useState(false);
  const [regConfirmPasswordError, setRegConfirmPasswordError] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [loginResponse, setLoginResponse] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [registerResponse, setRegisterResponse] = useState("");
  const [registerError, setRegisterError] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    if (
      !emailRegex.test(email.trim()) ||
      !email.trim().endsWith("stud.noroff.no")
    ) {
      setEmailError(true);
      setTimeout(() => {
        setEmailError(false);
      }, 3000);
      return; // Exit early if the email is invalid
    } else {
      setEmailError(false);
    }

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 3000);

      return; // Exit early if the password is too short
    } else {
      setPasswordError(false);
    }

    // Perform login logic here if all checks pass

    // Create a new user object
    const user = {
      email: email.toLowerCase().trim(),
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
        if (data.errors) {
          // Handle the error response here
          setLoginError(true);
          setLoginResponse(data.errors[0].message);
          setTimeout(() => {
            setLoginError(false);
            setLoginResponse("");
          }, 3000);
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
            .then((dataKey) => {
              localStorage.setItem("key", JSON.stringify(dataKey.data));

              fetch(`${ALL_PROFILES}${data.data.name}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${data.data.accessToken}`,
                  "X-Noroff-API-Key": `${dataKey.data.key}`,
                },
              })
                .then((response) => response.json())
                .then((dataProfile) => {
                  if (dataProfile.errors) {
                    // Handle the error response here
                    setLoginError(true);
                    setLoginResponse(dataProfile.errors[0].message);
                    setTimeout(() => {
                      setLoginError(false);
                      setLoginResponse("");
                    }, 3000);
                    return; // Exit early if there's an error
                  } else {
                    // Handle the API response here
                    localStorage.setItem(
                      "profile",
                      JSON.stringify(dataProfile.data)
                    );

                    navigate("/profile");
                  }
                })
                .catch((error) => {});
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {});
  };

  const handleRegister = () => {
    // Regular expression to match name without punctuation symbols apart from underscore
    const nameRegex = /^[A-Za-z0-9_]+$/;

    // Check if the name matches the allowed pattern
    if (!nameRegex.test(regName)) {
      setRegNameError(true);
      setTimeout(() => {
        setRegNameError(false);
      }, 3000);
      // name contains invalid characters, show an error message or handle it accordingly

      return; // Exit early if the name is invalid
    } else {
      setRegNameError(false);
    }

    // Regular expression to match email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the allowed pattern
    if (
      !emailRegex.test(regEmail.trim()) ||
      !regEmail.trim().endsWith("stud.noroff.no")
    ) {
      setRegEmailError(true);
      setTimeout(() => {
        setRegEmailError(false);
      }, 3000);
      return; // Exit early if the email is invalid
    } else {
      setRegEmailError(false);
    }

    // Check if the password is at least 8 characters long
    if (regPassword.length < 8) {
      setRegPasswordError(true);
      setTimeout(() => {
        setRegPasswordError(false);
      }, 3000);
      return; // Exit early if the password is too short
    } else {
      setRegPasswordError(false);
    }

    // Check if the password and confirm password match
    if (regPassword !== regConfirmPassword) {
      setRegConfirmPasswordError(true);
      setTimeout(() => {
        setRegConfirmPasswordError(false);
      }, 3000);
      return; // Exit early if the passwords don't match
    } else {
      setRegPasswordError(false);
    }

    // Create a new user object
    const newUser = {
      name: regName.toLowerCase().trim(),
      email: regEmail.toLowerCase().trim(),
      password: regPassword,
      venueManager: venueManager,
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
        if (data.errors) {
          // Handle the error response here
          setRegisterError(true);
          setRegisterResponse(data.errors[0].message);
          setTimeout(() => {
            setRegisterError(false);
            setRegisterResponse("");
          }, 3000);
          return; // Exit early if there's an error
        } else {
          setShowLogin(true);
          setShowRegister(false); // Ensure only the clicked one is active
          setRegSuccess(true);
        }
      })
      .catch((error) => {});
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
          {emailError && (
            <PopupMessage message="Email must end with @stud.noroff.no" /> // Pass onClose prop to handle popup close
          )}{" "}
          <StyledTextField
            required
            error={emailError}
            id="outlined-required"
            placeholder="Email@stud.noroff.no"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: {
                color: "black",
                backgroundColor: "#F5F5F5",
                height: "fit-content",
                width: "fit-content",
                borderRadius: "5px",
                padding: "0.2rem .7rem",
                margin: "-0.2rem 0 0 -.3rem",
                boxShadow: "0 2.5px 5px 0 rgba(0,0,0,0.2)",
                opacity: ".8",
              },
            }}
          />
          {passwordError && (
            <PopupMessage message="Password must be at least 8 characters long" /> // Pass onClose prop to handle popup close
          )}{" "}
          <FormControl
            error={passwordError}
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
          >
            <InputLabel
              style={{
                color: "black",
                backgroundColor: "#F5F5F5",
                height: "fit-content",
                width: "fit-content",
                borderRadius: "5px",
                padding: "0.2rem .7rem",
                marginTop: "-0.2rem",
                boxShadow: "0 2.5px 5px 0 rgba(0,0,0,0.2)",
                margin: "-0.2rem 0 0 -.3rem",
                opacity: ".8",
              }}
              htmlFor="outlined-adornment-password"
              required
            >
              Password
            </InputLabel>
            <StyledOutlinedInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {loginError && (
            <PopupMessage message={loginResponse} /> // Pass onClose prop to handle popup close
          )}{" "}
          <Button
            variant="contained"
            sx={{ padding: ".5rem 4rem", margin: ".5rem 0 0", width: "220px" }}
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
          {regNameError && (
            <PopupMessage message="Name must not contain symbols apart from underscore (_)" /> // Pass onClose prop to handle popup close
          )}{" "}
          <StyledTextField
            required
            error={regNameError}
            id="outlined-required"
            placeholder="Name"
            label="Name"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
            InputLabelProps={{
              style: {
                color: "black",
                backgroundColor: "#F5F5F5",
                height: "fit-content",
                width: "fit-content",
                borderRadius: "5px",
                padding: "0.2rem .7rem",
                margin: "-0.2rem 0 0 -.3rem",
                boxShadow: "0 2.5px 5px 0 rgba(0,0,0,0.2)",
                opacity: ".8",
              },
            }}
          />
          {regEmailError && (
            <PopupMessage message="Email must end with @stud.noroff.no" /> // Pass onClose prop to handle popup close
          )}{" "}
          <StyledTextField
            required
            error={regEmailError}
            id="outlined-required"
            placeholder="Email@stud.noroff.no"
            label="Email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            InputLabelProps={{
              style: {
                color: "black",
                backgroundColor: "#F5F5F5",
                height: "fit-content",
                width: "fit-content",
                borderRadius: "5px",
                padding: "0.2rem .7rem",
                margin: "-0.2rem 0 0 -.3rem",
                boxShadow: "0 2.5px 5px 0 rgba(0,0,0,0.2)",
                opacity: ".8",
              },
            }}
          />
          {regPasswordError && (
            <PopupMessage message="Password must be at least 8 characters long" /> // Pass onClose prop to handle popup close
          )}{" "}
          <FormControl
            error={regPasswordError}
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
          >
            <InputLabel
              style={{
                color: "black",
                backgroundColor: "#F5F5F5",
                height: "fit-content",
                width: "fit-content",
                borderRadius: "5px",
                padding: "0.2rem .7rem",
                marginTop: "-0.2rem",
                boxShadow: "0 2.5px 5px 0 rgba(0,0,0,0.2)",
                margin: "-0.2rem 0 0 -.3rem",
                opacity: ".8",
              }}
              htmlFor="outlined-adornment-password"
              required
            >
              Password
            </InputLabel>
            <StyledOutlinedInput
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              placeholder="Password"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {regConfirmPasswordError && (
            <PopupMessage message="Passwords does not match" /> // Pass onClose prop to handle popup close
          )}{" "}
          <FormControl
            error={regConfirmPasswordError}
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
          >
            <InputLabel
              style={{
                color: "black",
                backgroundColor: "#F5F5F5",
                height: "fit-content",
                width: "fit-content",
                borderRadius: "5px",
                padding: "0.2rem .7rem",
                marginTop: "-0.2rem",
                boxShadow: "0 2.5px 5px 0 rgba(0,0,0,0.2)",
                margin: "-0.2rem 0 0 -.3rem",
                opacity: ".8",
              }}
              htmlFor="outlined-adornment-password"
              required
            >
              Password
            </InputLabel>
            <StyledOutlinedInput
              value={regConfirmPassword}
              onChange={(e) => setRegConfirmPassword(e.target.value)}
              placeholder="Password"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
          {regSuccess && (
            <PopupMessage message="Registration successful! Please log in" /> // Pass onClose prop to handle popup close
          )}{" "}
          {registerError && (
            <PopupMessage message={registerResponse} /> // Pass onClose prop to handle popup close
          )}{" "}
          <Button
            variant="contained"
            sx={{ padding: ".5rem 4rem", margin: ".5rem 0 0", width: "220px" }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </StyledDiv2>
      </StyledBox>
    </>
  );
}

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

const StyledOutlinedInput = styled(OutlinedInput)`
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

export default LoginRegister;
