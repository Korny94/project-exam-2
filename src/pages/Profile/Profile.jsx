import React, { useState } from "react";
import styled from "styled-components";
import noProfileImg from "../../assets/noProfileImg.png";
import editBtn from "../../assets/editBtn.png";
import { Fab } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import trash from "../../assets/trash.png";
import Modal from "@mui/material/Modal";
import bookingsIcon from "../../assets/ticket.png";

import logOut from "../../assets/logOut.png";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

const ALL_PROFILES = process.env.REACT_APP_API_ALL_PROFILES;
const ALL_BOOKINGS = process.env.REACT_APP_API_ALL_BOOKINGS;
const ALL_VENUES = process.env.REACT_APP_API_ALL_VENUES;

const StyledModal = styled.div`
  width: 80vw;
  max-width: 400px;
  background-color: white;
  margin: 1rem auto;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const StyledImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  margin: 2rem auto;
  width: 50vw;
  max-width: 250px;
`;

const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0px 0px 20px 2px #1f4c65;
`;

const StyledEditBtn = styled.img`
  position: absolute;
  width: 20px;
  margin-top: 10em;
  margin-left: 12rem;
  opacity: 0.5;
`;

const StyledH2 = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  color: white;
`;

const StyledLogoutBtn = styled.img`
  width: 30px;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  cursor: pointer;
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
  width: 330px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledBookings = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

const StyledBooking = styled.div`
  box-shadow: 0px 0px 10px 2px #1f4c65;
  border-radius: 30px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
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
`;

const StyledBookingsIcon = styled.img`
  width: 22.5px;
  object-fit: cover;
  position: absolute;
  margin-left: 175px;
  cursor: pointer;
  filter: invert(1);
`;

const StyledEditIcon = styled.img`
  width: 22.5px;
  object-fit: cover;
  position: absolute;
  margin-left: 215px;
  cursor: pointer;
`;

const StyledTrashIcon = styled.img`
  width: 22.5px;
  object-fit: cover;
  position: absolute;
  margin-left: 255px;
  opacity: 0.6;
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
`;

function Login() {
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [showMyVenues, setShowMyVenues] = useState(false);
  const [showNewVenue, setShowNewVenue] = useState(false);
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const key = JSON.parse(localStorage.getItem("key"));
  const isImage = user.avatar.url !== null || user.avatar.url !== "";
  const [imageLoaded, setImageLoaded] = useState(false);
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openTwo, setOpenTwo] = React.useState(false);
  const handleOpenTwo = () => setOpenTwo(true);
  const handleCloseTwo = () => setOpenTwo(false);
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
  const [myVenues, setMyVenues] = useState([]);

  const handleCreateVenue = () => {
    console.log(
      venueName,
      description,
      price,
      maxGuests,
      wifi,
      parking,
      pets,
      breakfast,
      rating,
      address,
      city,
      zip,
      country,
      continent,
      latitude,
      longitude,
      imgUrl
    );

    if (!venueName || !description || !price || !maxGuests) {
      alert("Please fill in all required fields.");
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
          console.log(data.errors);
          alert(data.errors[0].message);
        } else {
          alert("Venue created successfully!");
          console.log(data.data);
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

  const handleProfileImgClick = () => {
    const userInput = window.prompt("Please enter image url:");
    if (userInput !== "" && userInput !== null && userInput !== "null") {
      fetch(`${ALL_PROFILES}${user.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": key.key,
        },
        body: JSON.stringify({
          avatar: {
            url: userInput,
            alt: "Profile Image",
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            alert(data.errors[0].message);
          } else {
            localStorage.setItem("user", JSON.stringify(data.data));
            window.location.reload();
          }
        });
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("key");
      Navigate("/");
    }, 500);
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
          console.log(data.errors);
          alert(data.errors[0].message);
        } else {
          console.log(data.data.bookings);
          setBookings(data.data.bookings);
        }
      });
  };

  const handleMyVenues = () => {
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
          alert(data.errors[0].message);
        } else {
          setVenues(data.data);
        }
      });
  };

  const handleNewVenue = () => {
    setShowMyBookings(false);
    setShowMyVenues(false);
    setShowNewVenue(true);
  };

  const fetchVenue = (bookingId) => {
    console.log(`${ALL_VENUES}${bookingId}?_bookings=true`);
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
          alert(data.errors[0].message);
        } else {
          console.log(data.data);
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
    console.log("Delete venue", venueId);

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
        alert("Venue deleted successfully!");
        window.location.reload();
      })
      .catch((error) => {
        // Check if the error is due to network issues or server errors
        if (
          error instanceof SyntaxError ||
          error.message === "Network response was not ok"
        ) {
          console.error("Error deleting venue:", error);
          alert(
            "An error occurred while deleting the venue. Please try again later."
          );
        } else {
          // If it's another type of error, propagate it
          throw error;
        }
      });
  };

  const handleEditClick = (venue) => {
    setOpen(true);
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

  const handleEditVenue = () => {
    console.log(
      editAddress,
      editCity,
      editZip,
      editCountry,
      editContinent,
      editImgUrl,
      editDescription,
      editPrice,
      editMaxGuests,
      editRating,
      editWifi,
      editParking,
      editPets,
      editBreakfast,
      editLatitude,
      editLongitude,
      editVenueName,
      venueId
    );

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
          console.log(data.errors);
          alert(data.errors[0].message);
        } else {
          alert("Venue edited successfully!");
          console.log(data.data);
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
          setOpen(false);
          window.location.reload();
        }
      });
  };

  const handleBookingsIconClick = (venue) => {
    handleOpenTwo();
    console.log(myVenues);
  };

  return (
    <>
      <StyledImgDiv onClick={handleProfileImgClick}>
        {isImage && (
          <StyledImg
            src={user.avatar.url}
            alt="Product"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
            style={{ display: imageLoaded ? "inline" : "none" }}
          />
        )}
        {!imageLoaded && (
          <StyledImg
            src={noProfileImg}
            alt="Default Image"
            style={{ display: imageLoaded ? "none" : "inline" }}
          />
        )}
        <StyledEditBtn src={editBtn} alt="Edit" />
      </StyledImgDiv>
      <StyledH2>{capitalizeFirstLetter(user.name)}</StyledH2>
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
              >
                <div
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
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
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  {" "}
                  <StyledBookingImg src={venue.media[0].url} />
                  <StyledH3>{capitalizeFirstLetter(venue.name)}</StyledH3>
                </div>
                <StyledBookingsIcon
                  onClick={() => {
                    handleBookingsIconClick(venue);
                    setMyVenues(venue.bookings);
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
                  alt="Edit"
                />
                <StyledTrashIcon
                  src={trash}
                  alt="Delete"
                  onClick={() => handleDeleteVenue(venue.id)}
                />
              </StyledBooking>
            ))}
          </StyledBookings>
        )}
        {showNewVenue && (
          <StyledBookings>
            <StyledTextField
              required
              id="outlined-required"
              placeholder="Name of Venue"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              label="Name of Venue"
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
            />

            <StyledTextField
              required
              id="outlined-number"
              placeholder="Price"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <StyledTextField
              required
              id="outlined-number"
              placeholder="Max. Guests"
              label="Max. Guests"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
            <StyledTextField
              id="outlined-required"
              placeholder="Image URL"
              label="Image URL"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="WiFi Included"
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
              label="Parking Included"
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
              label="Breakfast Included"
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
            <StyledTextField
              id="outlined-number"
              placeholder="Rating"
              label="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <StyledTextField
              id="outlined-required"
              placeholder="Address"
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <StyledTextField
              id="outlined-required"
              placeholder="City"
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <StyledTextField
              id="outlined-required"
              placeholder="Zip-code"
              label="Zip-code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
            <StyledTextField
              id="outlined-required"
              placeholder="Country"
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <StyledTextField
              id="outlined-required"
              placeholder="Continent"
              label="Continent"
              value={continent}
              onChange={(e) => setContinent(e.target.value)}
            />

            <StyledTextField
              id="outlined-number"
              placeholder="Latitude"
              label="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <StyledTextField
              id="outlined-number"
              placeholder="Longitude"
              label="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />

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
      <StyledLogoutBtn
        onClick={handleLogout}
        src={logOut}
        alt="Log Out"
        title="Log out"
      />

      <Modal
        style={{ overflow: "scroll" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledModal>
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
            <StyledTextField
              id="outlined-required"
              placeholder="Image URL"
              label="Image URL"
              value={editImgUrl}
              onChange={(e) => setEditImgUrl(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="WiFi Included"
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 28 },
                backgroundColor: "white",
                color: "black",
                borderRadius: "5px",
                margin: 0,
              }}
              checked={editWifi}
              onChange={(e) => setEditWifi(e.target.checked)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Parking Included"
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 28 },
                backgroundColor: "white",
                color: "black",
                borderRadius: "5px",
                margin: 0,
              }}
              checked={editParking}
              onChange={(e) => setEditParking(e.target.checked)}
            />
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
              checked={editPets}
              onChange={(e) => setEditPets(e.target.checked)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Breakfast Included"
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 28 },
                backgroundColor: "white",
                color: "black",
                borderRadius: "5px",
                margin: 0,
              }}
              checked={editBreakfast}
              onChange={(e) => setEditBreakfast(e.target.checked)}
            />
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

            <Button
              variant="contained"
              sx={{ padding: ".5rem 4rem", margin: ".5rem 0 0" }}
              onClick={handleEditVenue}
            >
              Edit Venue
            </Button>
          </StyledBookings>
        </StyledModal>
      </Modal>

      <Modal
        style={{ overflow: "scroll" }}
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
