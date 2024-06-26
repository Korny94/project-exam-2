import Logout from "../../Components/Logout/Logout.jsx";
import ProfileImgClick from "../../Components/ProfileImgClick/ProfileImgClick.jsx";

import React, { useState, useEffect } from "react";
import editBtn from "../../assets/editBtn.png";
import styled from "styled-components";
import { Fab } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import trash from "../../assets/trash.png";
import Modal from "@mui/material/Modal";
import bookingsIcon from "../../assets/ticket.png";
import PopupMessage from "../../Components/PopupMessage/PopupMessage.jsx";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

const ALL_PROFILES = process.env.REACT_APP_API_ALL_PROFILES;
const ALL_VENUES = process.env.REACT_APP_API_ALL_VENUES;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledModal = styled.div`
  width: 80vw;
  max-width: 400px;
  margin: 1rem auto;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: rgba(217, 217, 217, 0.1);
`;

const StyledH2 = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  color: white;
`;

const StyledBtnsDiv = styled.div`
  width: 90vw;
  display: flex;
  justify-content: space-around;
  margin: 3rem auto 2rem;
  gap: 2rem;

  @media (max-width: 599px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
`;

const StyledBookingsDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  width: 90vw;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;
  align-items: center;
  margin: 0 auto;
`;

const StyledBookings = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  align-items: center;
  padding: 1rem 0;
`;

const StyledBooking = styled.div`
  box-shadow: 0px 0px 10px 2px #1f4c65;
  width: 75vw;
  border-radius: 30px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledBookingIconsDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledBookingImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const StyledH3 = styled.h3`
  width: 90px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const StyledTextField = styled(TextField)`
  background-color: white;
  border-radius: 5px;
  width: 100%;
`;

const StyledBookingsIcon = styled.img`
  width: 22.5px;
  cursor: pointer;
  filter: invert(1);
`;

const StyledEditIcon = styled.img`
  width: 22.5px;
  cursor: pointer;
`;

const StyledTrashIcon = styled.img`
  width: 22.5px;
  opacity: 0.6;
  cursor: pointer;
`;

const StyledVenueBooking = styled.div`
  box-shadow: 0px 0px 5px 1px #1f4c65;
  border-radius: 30px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  background-color: #212121;
  color: white;
`;

function Login() {
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [showMyVenues, setShowMyVenues] = useState(false);
  const [showNewVenue, setShowNewVenue] = useState(false);
  const Navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const key = JSON.parse(localStorage.getItem("key"));

  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [venueName, setVenueName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [rating, setRating] = useState("");
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [pets, setPets] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [openTwo, setOpenTwo] = React.useState(false);
  const handleOpenTwo = () => setOpenTwo(true);
  const handleCloseTwo = () => setOpenTwo(false);

  const [myVenues, setMyVenues] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopupMessage, setShowPopupMessage] = useState(false);

  const [openOne, setOpenOne] = React.useState(false);
  const handleOpen = () => setOpenOne(true);
  const handleClose = () => setOpenOne(false);
  const [editAddress, setEditAddress] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editZip, setEditZip] = useState("");
  const [editCountry, setEditCountry] = useState("");
  const [editContinent, setEditContinent] = useState("");
  const [editImgUrl, setEditImgUrl] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editMaxGuests, setEditMaxGuests] = useState("");
  const [editRating, setEditRating] = useState("");
  const [editWifi, setEditWifi] = useState(false);
  const [editParking, setEditParking] = useState(false);
  const [editPets, setEditPets] = useState(false);
  const [editBreakfast, setEditBreakfast] = useState(false);
  const [editLatitude, setEditLatitude] = useState("");
  const [editLongitude, setEditLongitude] = useState("");
  const [editVenueName, setEditVenueName] = useState("");
  const [venueId, setVenueId] = useState("");

  const [venueManager, setVenueManager] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    // Check if profile exists and if venueManager is "true" in the profile
    if (profile && profile.venueManager === true) {
      setVenueManager(true);
    } else {
      setVenueManager(false);
    }
  }, []);

  const handleVenueManagerChange = (event) => {
    const newValue = event.target.checked;
    setVenueManager(newValue);
    handleVenueManager(newValue); // Call the function to update the profile
  };

  const handleVenueManager = (newValue) => {
    fetch(`${ALL_PROFILES}${user.name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
        "X-Noroff-API-Key": key.key,
      },
      body: JSON.stringify({
        venueManager: newValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          handlePopupMessages(data.errors[0].message);
        } else {
          localStorage.setItem("profile", JSON.stringify(data.data));

          handlePopupMessages("Venue Manager status updated successfully!");
          if (data.data.venueManager === false) {
            setShowMyVenues(false);
            setShowMyBookings(false);
            setShowNewVenue(false);
          }
        }
      });
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleEditVenue = () => {
    fetch(`${ALL_VENUES}${venueId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
        "X-Noroff-API-Key": key.key,
      },

      body: JSON.stringify({
        name: editVenueName,
        description: editDescription,
        media: [
          {
            url:
              editImgUrl ||
              "https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png",
            alt: "Venue Image",
          },
        ],
        price: parseFloat(editPrice) || 0,
        maxGuests: parseInt(editMaxGuests) || 1,
        rating: parseFloat(editRating) || 0,
        meta: {
          wifi: editWifi,
          parking: editParking,
          pets: editPets,
          breakfast: editBreakfast,
        },
        location: {
          address: editAddress,
          city: editCity,
          zip: editZip,
          country: editCountry,
          continent: editContinent,
          lat: parseFloat(editLatitude) || 0,
          lng: parseFloat(editLongitude) || 0,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          handlePopupMessages(data.errors[0].message);
        } else {
          handlePopupMessages("Venue edited successfully!");
          setAddress("");
          setCity("");
          setZip("");
          setCountry("");
          setContinent("");
          setImgUrl("");
          setDescription("");
          setPrice("");
          setMaxGuests("");
          setRating("");
          setWifi(false);
          setParking(false);
          setPets(false);
          setBreakfast(false);
          setLatitude("");
          setLongitude("");
          setVenueName("");
          setOpenOne(false);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      });
  };

  const handlePopupMessages = (message) => {
    setPopupMessage(message);
    setShowPopupMessage(true);
    setTimeout(() => {
      setShowPopupMessage(false);
    }, 3000);
  };

  const handleCreateVenue = () => {
    if (!venueName || !description || !price || !maxGuests) {
      handlePopupMessages("Please fill in all required fields.");
      return;
    }

    fetch(`${ALL_VENUES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
        "X-Noroff-API-Key": key.key,
      },
      body: JSON.stringify({
        name: venueName,
        description: description,
        media: [
          {
            url:
              imgUrl ||
              "https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png",
            alt: "Venue Image",
          },
        ],
        price: parseFloat(price) || 0,
        maxGuests: parseInt(maxGuests) || 1,
        rating: parseFloat(rating) || 0,
        meta: {
          wifi: wifi,
          parking: parking,
          pets: pets,
          breakfast: breakfast,
        },
        location: {
          address: address,
          city: city,
          zip: zip,
          country: country,
          continent: continent,
          lat: parseFloat(latitude) || 0,
          lng: parseFloat(longitude) || 0,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          handlePopupMessages(data.errors[0].message);
        } else {
          handlePopupMessages("Venue created successfully!");
          setShowNewVenue(false);

          setAddress("");
          setCity("");
          setZip("");
          setCountry("");
          setContinent("");
          setImgUrl("");
          setDescription("");
          setPrice("");
          setMaxGuests("");
          setRating("");
          setWifi(false);
          setParking(false);
          setPets(false);
          setBreakfast(false);
          setLatitude("");
          setLongitude("");
          setVenueName("");
        }
      });
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleMyBookings = () => {
    setShowMyBookings(true);
    setShowMyVenues(false);
    setShowNewVenue(false);

    fetch(`${ALL_PROFILES}${user.name}?_bookings=true&venues=true`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "X-Noroff-API-Key": key.key,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          handlePopupMessages(data.errors[0].message);
        } else {
          const fetchedBookings = data.data.bookings.sort((a, b) => {
            const dateA = new Date(a.dateFrom);
            const dateB = new Date(b.dateFrom);
            return dateA - dateB;
          });
          setBookings(fetchedBookings);
        }
      });
  };

  const handleMyVenues = () => {
    const profile = JSON.parse(localStorage.getItem("profile"));

    if (profile.venueManager) {
      setShowMyBookings(false);
      setShowMyVenues(true);
      setShowNewVenue(false);
      fetch(`${ALL_PROFILES}${user.name}/venues?_bookings=true`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": key.key,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            handlePopupMessages(data.errors[0].message);
          } else {
            setVenues(data.data);
          }
        });
    } else {
      setShowMyBookings(false);
      setShowMyVenues(false);
      setShowNewVenue(false);
      handlePopupMessages(
        "Please enable Venue Manager status to view your venues."
      );
    }
  };

  const handleNewVenue = () => {
    const profile = JSON.parse(localStorage.getItem("profile"));

    if (profile.venueManager) {
      setShowMyBookings(false);
      setShowMyVenues(false);
      setShowNewVenue(true);
    } else {
      setShowMyBookings(false);
      setShowMyVenues(false);
      setShowNewVenue(false);
      handlePopupMessages(
        "Please enable Venue Manager status to create a new venue."
      );
    }
  };

  const fetchVenue = (bookingId) => {
    fetch(`${ALL_VENUES}${bookingId}?_bookings=true`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "X-Noroff-API-Key": key.key,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          handlePopupMessages(data.errors[0].message);
        } else {
          localStorage.setItem("productInfo", JSON.stringify(data.data));
          localStorage.setItem("product", JSON.stringify(data.data));

          Navigate("/product");
        }
      });
  };

  function formatDate(dateStr) {
    // Create a new Date object from the input string
    const date = new Date(dateStr);

    // Extract year, month, and day from the date object
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding leading zero if needed
    const day = ("0" + date.getDate()).slice(-2); // Adding leading zero if needed

    // Concatenate year, month, and day with hyphens to form the desired format
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const handleDeleteVenue = (venueId) => {
    fetch(`${ALL_VENUES}${venueId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "X-Noroff-API-Key": key.key,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        // Check if response status is 204 No Content, indicating successful deletion without content
        if (res.status === 204) {
          // Return an empty object to avoid parsing empty JSON
          return {};
        }
        return res.json();
      })
      .then((data) => {
        // If you reach this point, the deletion was successful
        handlePopupMessages("Venue deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        // Check if the error is due to network issues or server errors
        if (
          error instanceof SyntaxError ||
          error.message === "Network response was not ok"
        ) {
          handlePopupMessages(
            "An error occurred while deleting the venue. Please try again later."
          );
        } else {
          // If it's another type of error, propagate it
          throw error;
        }
      });
  };

  const handleEditClick = (venue) => {
    setOpenOne(true);
    setVenueId(venue.id);
    setEditVenueName(venue.name);
    setEditDescription(venue.description);
    setEditPrice(venue.price);
    setEditMaxGuests(venue.maxGuests);
    setEditRating(venue.rating);
    setEditWifi(venue.meta.wifi);
    setEditParking(venue.meta.parking);
    setEditPets(venue.meta.pets);
    setEditBreakfast(venue.meta.breakfast);
    setEditAddress(venue.location.address);
    setEditCity(venue.location.city);
    setEditZip(venue.location.zip);
    setEditCountry(venue.location.country);
    setEditContinent(venue.location.continent);
    setEditLatitude(venue.location.lat);
    setEditLongitude(venue.location.lng);
    setEditImgUrl(venue.media[0].url);
  };

  const handleBookingsIconClick = (venue) => {
    handleOpenTwo();

    const fetchedBookings = venue.bookings.sort((a, b) => {
      const dateA = new Date(a.dateFrom);
      const dateB = new Date(b.dateFrom);
      return dateA - dateB;
    });
    setMyVenues(fetchedBookings);
  };

  return (
    <>
      {showPopupMessage && <PopupMessage message={popupMessage} />}
      <ProfileImgClick />
      <StyledH2>{capitalizeFirstLetter(user.name)}</StyledH2>
      <StyledDiv>
        <Checkbox
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
          sx={{ color: "white" }}
          checked={venueManager}
          onChange={handleVenueManagerChange} // Pass the event handler to onChange
        />
        <p style={{ color: "white" }}>Be a Venue Manager</p>
        <HelpOutlineIcon
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
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
            disableScrollLock
          >
            <Typography sx={{ p: 1 }}>
              Become a venue manager to create own venues and more!
            </Typography>
          </Popover>
        </div>
      </StyledDiv>
      <StyledBtnsDiv>
        <Fab
          variant="extended"
          size="medium"
          color="text.secondary"
          sx={{ width: "250px", fontSize: "1rem", fontWeight: "550" }}
          onClick={handleMyBookings}
        >
          My Bookings
        </Fab>
        <Fab
          variant="extended"
          size="medium"
          color="text.secondary"
          sx={{ width: "250px", fontSize: "1rem", fontWeight: "550" }}
          onClick={handleMyVenues}
        >
          My Venues
        </Fab>
        <Fab
          variant="extended"
          size="medium"
          color="text.secondary"
          sx={{ width: "250px", fontSize: "1rem", fontWeight: "550" }}
          onClick={handleNewVenue}
        >
          New Venue
        </Fab>
      </StyledBtnsDiv>
      <StyledBookingsDiv>
        {showMyBookings && (
          <StyledBookings>
            {bookings.map((booking) => (
              <StyledBooking
                title="YYYY-MM-DD"
                onClick={() => fetchVenue(booking.venue.id)}
                key={booking.id}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <StyledBookingImg src={booking.venue.media[0].url} />
                  <StyledH3>
                    {capitalizeFirstLetter(booking.venue.name)}
                  </StyledH3>
                </div>
                {formatDate(booking.dateFrom)} <br />
                {formatDate(booking.dateTo)}
              </StyledBooking>
            ))}
          </StyledBookings>
        )}
        {showMyVenues && (
          <StyledBookings>
            {venues.map((venue) => (
              <StyledBooking>
                <div
                  onClick={() => fetchVenue(venue.id)}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <StyledBookingImg src={venue.media[0].url} />
                  <StyledH3>{capitalizeFirstLetter(venue.name)}</StyledH3>
                </div>
                <StyledBookingIconsDiv>
                  <StyledBookingsIcon
                    onClick={() => {
                      handleBookingsIconClick(venue);
                    }}
                    src={bookingsIcon}
                    alt="Bookings"
                    title="Bookings"
                  />
                  <StyledEditIcon
                    onClick={() => {
                      handleEditClick(venue);
                    }}
                    src={editBtn}
                    title="Edit Venue"
                    alt="Edit"
                  />
                  <StyledTrashIcon
                    src={trash}
                    title="Delete Venue"
                    alt="Delete"
                    onClick={() => handleDeleteVenue(venue.id)}
                  />
                </StyledBookingIconsDiv>
              </StyledBooking>
            ))}
          </StyledBookings>
        )}
        {showNewVenue && (
          <StyledBookings style={{ width: "350px" }}>
            <StyledTextField
              required
              id="outlined-required"
              placeholder="Name of Venue"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              label="Name of Venue"
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
                  opacity: ".9",
                },
              }}
            />
            <StyledTextField
              required
              id="outlined-multiline-static"
              multiline
              placeholder="Description *"
              rows={4}
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                  opacity: ".9",
                },
              }}
            />

            <StyledDiv style={{ gap: ".5rem" }}>
              <StyledTextField
                required
                id="outlined-number"
                placeholder="Price"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: "60%" }}
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
                    opacity: ".9",
                  },
                }}
              />
              <StyledTextField
                id="outlined-number"
                placeholder="Rating"
                label="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{ width: "60%" }}
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
                    opacity: ".9",
                  },
                }}
              />
              <StyledTextField
                required
                id="outlined-number"
                placeholder="Max. Guests"
                label="Max. Guests"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
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
                    opacity: ".9",
                  },
                }}
              />
            </StyledDiv>
            <StyledTextField
              id="outlined-required"
              placeholder="Image URL"
              label="Image URL"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
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
                  opacity: ".9",
                },
              }}
            />
            <StyledDiv style={{ gap: "1rem", width: "100%" }}>
              <FormControlLabel
                control={<Checkbox />}
                label="WiFi"
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "5px",
                  margin: 0,
                }}
                checked={wifi} // Use checked instead of value
                onChange={(e) => setWifi(e.target.checked)}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Parking "
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "5px",
                  margin: 0,
                }}
                checked={parking}
                onChange={(e) => setParking(e.target.checked)}
              />
            </StyledDiv>
            <StyledDiv style={{ gap: "1rem", width: "100%" }}>
              <FormControlLabel
                control={<Checkbox />}
                label="Pets Allowed"
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "5px",
                  margin: 0,
                }}
                checked={pets}
                onChange={(e) => setPets(e.target.checked)}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Breakfast"
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "5px",
                  margin: 0,
                }}
                checked={breakfast}
                onChange={(e) => setBreakfast(e.target.checked)}
              />
            </StyledDiv>

            <StyledTextField
              id="outlined-required"
              placeholder="Address"
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
                  opacity: ".9",
                },
              }}
            />
            <StyledDiv style={{ gap: "1rem" }}>
              <StyledTextField
                id="outlined-required"
                placeholder="City"
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
                    opacity: ".9",
                  },
                }}
              />
              <StyledTextField
                id="outlined-required"
                placeholder="Zip-code"
                label="Zip-code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
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
                    opacity: ".9",
                  },
                }}
              />
            </StyledDiv>
            <StyledDiv style={{ gap: "1rem" }}>
              <StyledTextField
                id="outlined-required"
                placeholder="Country"
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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
                    opacity: ".9",
                  },
                }}
              />
              <StyledTextField
                id="outlined-required"
                placeholder="Continent"
                label="Continent"
                value={continent}
                onChange={(e) => setContinent(e.target.value)}
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
                    opacity: ".9",
                  },
                }}
              />
            </StyledDiv>
            <StyledDiv style={{ gap: "1rem" }}>
              <StyledTextField
                id="outlined-number"
                placeholder="Latitude"
                label="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
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
                    opacity: ".9",
                  },
                }}
              />
              <StyledTextField
                id="outlined-number"
                placeholder="Longitude"
                label="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
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
                    opacity: ".9",
                  },
                }}
              />
            </StyledDiv>
            <Button
              variant="contained"
              sx={{ padding: ".5rem 4rem", margin: ".5rem 0 0" }}
              onClick={handleCreateVenue}
            >
              Create Venue
            </Button>
          </StyledBookings>
        )}
      </StyledBookingsDiv>
      <Logout />
      <Modal
        style={{ overflowY: "auto", overflowX: "hidden", margin: "5rem auto" }}
        open={openOne}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledModal style={{ backgroundColor: "white" }}>
          <StyledBookings>
            <StyledTextField
              id="outlined-required"
              placeholder="Name of Venue"
              value={editVenueName}
              onChange={(e) => setEditVenueName(e.target.value)}
              label="Name of Venue"
            />
            <StyledTextField
              id="outlined-multiline-static"
              multiline
              placeholder="Description *"
              rows={4}
              label="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <StyledDiv style={{ gap: "1rem" }}>
              <StyledTextField
                id="outlined-number"
                placeholder="Price"
                label="Price"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
              <StyledTextField
                id="outlined-number"
                placeholder="Max. Guests"
                label="Max. Guests"
                value={editMaxGuests}
                onChange={(e) => setEditMaxGuests(e.target.value)}
              />
            </StyledDiv>
            <StyledTextField
              id="outlined-required"
              placeholder="Image URL"
              label="Image URL"
              value={editImgUrl}
              onChange={(e) => setEditImgUrl(e.target.value)}
            />
            <StyledDiv style={{ gap: "1rem", width: "100%" }}>
              <FormControlLabel
                control={<Checkbox />}
                label="WiFi"
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "5px",
                  margin: 0,
                }}
                checked={editWifi}
                onChange={(e) => setEditWifi(e.target.checked)}
                title="WiFi Included"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Parking"
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "5px",
                  margin: 0,
                }}
                checked={editParking}
                onChange={(e) => setEditParking(e.target.checked)}
                title="Parking Included"
              />
            </StyledDiv>
            <StyledDiv style={{ gap: "1rem", width: "100%" }}>
              <FormControlLabel
                control={<Checkbox />}
                label="Breakfast"
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "5px",
                  margin: 0,
                }}
                checked={editBreakfast}
                onChange={(e) => setEditBreakfast(e.target.checked)}
                title="Breakfast Included"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Pets"
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "5px",
                  margin: 0,
                }}
                checked={editPets}
                onChange={(e) => setEditPets(e.target.checked)}
                title="Pets Allowed"
              />
            </StyledDiv>
            <StyledTextField
              id="outlined-number"
              placeholder="Rating"
              label="Rating"
              value={editRating}
              onChange={(e) => setEditRating(e.target.value)}
            />
            <StyledTextField
              id="outlined-required"
              placeholder="Address"
              label="Address"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
            />
            <StyledDiv style={{ gap: "1rem" }}>
              <StyledTextField
                id="outlined-required"
                placeholder="City"
                label="City"
                value={editCity}
                onChange={(e) => setEditCity(e.target.value)}
              />
              <StyledTextField
                id="outlined-required"
                placeholder="Zip-code"
                label="Zip-code"
                value={editZip}
                onChange={(e) => setEditZip(e.target.value)}
              />
            </StyledDiv>
            <StyledDiv style={{ gap: "1rem" }}>
              <StyledTextField
                id="outlined-required"
                placeholder="Country"
                label="Country"
                value={editCountry}
                onChange={(e) => setEditCountry(e.target.value)}
              />
              <StyledTextField
                id="outlined-required"
                placeholder="Continent"
                label="Continent"
                value={editContinent}
                onChange={(e) => setEditContinent(e.target.value)}
              />
            </StyledDiv>
            <StyledDiv style={{ gap: "1rem" }}>
              <StyledTextField
                id="outlined-number"
                placeholder="Latitude"
                label="Latitude"
                value={editLatitude}
                onChange={(e) => setEditLatitude(e.target.value)}
              />
              <StyledTextField
                id="outlined-number"
                placeholder="Longitude"
                label="Longitude"
                value={editLongitude}
                onChange={(e) => setEditLongitude(e.target.value)}
              />
            </StyledDiv>
            <Button
              variant="contained"
              sx={{ padding: ".5rem 4rem", margin: ".0" }}
              onClick={handleEditVenue}
            >
              Edit Venue
            </Button>
            <Button
              variant="contained"
              sx={{
                padding: ".5rem 4rem",
                margin: "0 0 .5rem 0",
                backgroundColor: "text.secondary",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </StyledBookings>
        </StyledModal>
      </Modal>
      <Modal
        style={{ overflowY: "auto", overflowX: "hidden", margin: "5rem auto" }}
        open={openTwo}
        onClose={handleCloseTwo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledModal>
          <StyledBookings style={{ marginBottom: "2rem" }}>
            {myVenues.map((booking) => (
              <StyledVenueBooking key={booking.id}>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <StyledBookingImg src={booking.customer.avatar.url} />
                  <StyledH3>
                    {capitalizeFirstLetter(booking.customer.name)}
                  </StyledH3>
                </div>
                {formatDate(booking.dateFrom)} <br />
                {formatDate(booking.dateTo)}
              </StyledVenueBooking>
            ))}
          </StyledBookings>
        </StyledModal>
      </Modal>
    </>
  );
}

export default Login;
