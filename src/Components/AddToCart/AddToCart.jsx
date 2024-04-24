import "./AddToCart.scss";
import ticket from "../../assets/ticket.png";
import styled from "styled-components";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import Modal from "@mui/material/Modal";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ALL_BOOKINGS = process.env.REACT_APP_API_ALL_BOOKINGS;
console.log(ALL_BOOKINGS);

// function ServerDay(props) {
//   const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

//   const isTodayOrLater = dayjs(day).isAfter(dayjs(), "day"); // Check if the day is today or later
//   const isDisabled = !isTodayOrLater || highlightedDays.includes(day.date()); // Check if the day is disabled

//   return (
//     <PickersDay
//       {...other}
//       outsideCurrentMonth={outsideCurrentMonth}
//       day={day}
//       disabled={isDisabled} // Disable the day if it's included in highlightedDays or it's not today or later
//     />
//   );
// }

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isTodayOrLater = dayjs(day).isAfter(dayjs(), "day"); // Check if the day is today or later
  const isDisabled = !isTodayOrLater || highlightedDays.includes(day.date()); // Check if the day is disabled

  return (
    <PickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      disabled={isDisabled} // Disable the day if it's included in highlightedDays or it's not today or later
    />
  );
}

const StyledIcon = styled.img`
  width: 17px;
  height: 17px;
`;

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

const StyledH2 = styled.h2`
  margin: 1rem 0 0 0;
`;

function AddToCart({ product }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [fromValue, setFromValue] = React.useState(null);
  // const [toValue, setToValue] = React.useState(null);

  const [guests, setGuests] = React.useState(1);

  const handleGuestChange = (event) => {
    setGuests(event.target.value);
  };

  // const handleNewFromValue = (newValue) => {
  //   setFromValue(newValue);
  //   console.log(newValue, getAdjustedISOString(newValue));
  // };

  // const handleNewToValue = (newValue) => {
  //   setToValue(newValue);
  //   console.log(newValue, getAdjustedISOString(newValue));
  // };

  const key = JSON.parse(localStorage.getItem("key"));
  const user = JSON.parse(localStorage.getItem("user"));

  const [fromValue, setFromValue] = React.useState(null);
  const [toValue, setToValue] = React.useState(null);

  const [isLoadingFrom, setIsLoadingFrom] = React.useState(false);
  const [highlightedDaysFrom, setHighlightedDaysFrom] = React.useState([]);

  const [isLoadingTo, setIsLoadingTo] = React.useState(false);
  const [highlightedDaysTo, setHighlightedDaysTo] = React.useState([]);

  const requestAbortControllerFrom = React.useRef(null);
  const requestAbortControllerTo = React.useRef(null);

  const fetchHighlightedDays = (
    date,
    setIsLoading,
    setHighlightedDays,
    requestAbortController
  ) => {
    const controller = new AbortController();

    // Set loading state to true while fetching data
    setIsLoading(true);

    // Filter the bookings array to get the bookings within the current month
    const bookingsInMonth = product.bookings.filter((booking) => {
      const bookingDateFrom = dayjs(booking.dateFrom);
      const bookingDateTo = dayjs(booking.dateTo);
      return (
        bookingDateFrom.isSame(date, "month") ||
        bookingDateTo.isSame(date, "month") ||
        (bookingDateFrom.isBefore(date, "month") &&
          bookingDateTo.isAfter(date, "month"))
      );
    });

    // Generate an array of days to highlight for each booking
    const daysToHighlight = bookingsInMonth.reduce(
      (highlightedDays, booking) => {
        const bookingDateFrom = dayjs(booking.dateFrom);
        const bookingDateTo = dayjs(booking.dateTo);
        const daysInRange = [];

        // Loop through each day within the booking range and add it to the array
        for (
          let date = bookingDateFrom;
          date.isBefore(bookingDateTo.subtract(1, "day")) ||
          date.isSame(bookingDateTo.subtract(1, "day"), "day");
          date = date.add(1, "day")
        ) {
          if (date.isSame(date, "month")) {
            daysInRange.push(date.date());
          }
        }

        return [...highlightedDays, ...daysInRange];
      },
      []
    );

    // Set loading state to false and update state with highlighted days
    setIsLoading(false);
    setHighlightedDays(daysToHighlight);

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    const currentDate = dayjs();
    fetchHighlightedDays(
      currentDate,
      setIsLoadingFrom,
      setHighlightedDaysFrom,
      requestAbortControllerFrom
    );
    fetchHighlightedDays(
      currentDate,
      setIsLoadingTo,
      setHighlightedDaysTo,
      requestAbortControllerTo
    );

    // abort request on unmount
    return () => {
      requestAbortControllerFrom.current?.abort();
      requestAbortControllerTo.current?.abort();
    };
  }, []);

  const handleMonthChangeFrom = (date) => {
    if (requestAbortControllerFrom.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortControllerFrom.current.abort();
    }

    setIsLoadingFrom(true);
    setHighlightedDaysFrom([]);
    fetchHighlightedDays(
      date,
      setIsLoadingFrom,
      setHighlightedDaysFrom,
      requestAbortControllerFrom
    );
  };

  const handleMonthChangeTo = (date) => {
    if (requestAbortControllerTo.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortControllerTo.current.abort();
    }

    setIsLoadingTo(true);
    setHighlightedDaysTo([]);
    fetchHighlightedDays(
      date,
      setIsLoadingTo,
      setHighlightedDaysTo,
      requestAbortControllerTo
    );
  };

  const handleBooking = () => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    } else if (fromValue === null) {
      alert("Please select a 'from' date.");
    } else if (toValue === null) {
      alert("Please select a 'to' date.");
    } else if (fromValue.isAfter(toValue)) {
      alert("The 'from' date must be before the 'to' date.");
    } else if (fromValue.isSame(toValue, "day")) {
      alert("The 'from' date cannot be the same as the 'to' date.");
    } else {
      console.log("Highlighted days:", highlightedDays);
      // Check if any dates between fromValue and toValue are disabled or highlighted
      const datesInRange = [];
      let currentDate = fromValue.startOf("day");
      while (
        currentDate.isBefore(dayjs(toValue).startOf("day")) ||
        currentDate.isSame(dayjs(toValue).startOf("day"), "day")
      ) {
        datesInRange.push(currentDate);
        currentDate = currentDate.add(1, "day");
      }

      const isAnyDateDisabledOrHighlighted = datesInRange.some((date) =>
        highlightedDays.includes(date.date())
      );

      if (isAnyDateDisabledOrHighlighted) {
        alert("Some dates between 'from' and 'to' are already booked.");
        return; // Prevent further execution of the booking process
      }

      // Create a new booking object
      const newBooking = {
        dateFrom: getAdjustedISOString(fromValue), // Required - Instance of new Date()
        dateTo: getAdjustedISOString(toValue), // Required - Instance of new Date()
        guests: guests, // Required
        venueId: product.id, // Required - The id of the venue to book
      };

      console.log("New booking:", newBooking);

      // Send a POST request to the API to create a new booking
      fetch(ALL_BOOKINGS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": key.key,
        },
        body: JSON.stringify(newBooking),
      })
        .then((response) => {
          if (!response.ok) {
            alert("An error occurred. Please try again.");
          }
          return response.json();
        })

        .then((data) => {
          console.log("Booking created:", data);

          product.bookings.push(data.data);
          localStorage.setItem("productInfo", JSON.stringify(product));
          navigate("/checkoutSuccess");
        })

        .catch((error) => {
          console.error("Error creating booking:", error);
        });
    }
  };

  // const handleBooking = () => {
  //   if (localStorage.getItem("user") === null) {
  //     navigate("/login");
  //   } else if (fromValue === null) {
  //     alert("Please select a 'from' date.");
  //   } else if (toValue === null) {
  //     alert("Please select a 'to' date.");
  //   } else if (fromValue.isAfter(toValue)) {
  //     alert("The 'from' date must be before the 'to' date.");
  //   } else if (fromValue.isSame(toValue, "day")) {
  //     alert("The 'from' date cannot be the same as the 'to' date.");
  //   } else {
  //     // Create a new booking object
  //     const newBooking = {
  //       dateFrom: getAdjustedISOString(fromValue), // Required - Instance of new Date()
  //       dateTo: getAdjustedISOString(toValue), // Required - Instance of new Date()
  //       guests: guests, // Required
  //       venueId: product.id, // Required - The id of the venue to book
  //     };

  //     console.log("New booking:", newBooking);

  //     // Send a POST request to the API to create a new booking
  //     fetch(ALL_BOOKINGS, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.accessToken}`,
  //         "X-Noroff-API-Key": key.key,
  //       },
  //       body: JSON.stringify(newBooking),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           alert("An error occurred. Please try again.");
  //         }
  //         return response.json();
  //       })

  //       .then((data) => {
  //         console.log("Booking created:", data);

  //         product.bookings.push(data.data);
  //         localStorage.setItem("productInfo", JSON.stringify(product));
  //         navigate("/checkoutSuccess");
  //       })

  //       .catch((error) => {
  //         console.error("Error creating booking:", error);
  //       });
  //   }
  // };

  // Function to get ISO string with adjusted time zone offset
  const getAdjustedISOString = (date) => {
    const offsetMinutes = date.utcOffset();
    const adjustedDate = date.add(offsetMinutes, "minute");
    return adjustedDate.toISOString();
  };

  // const requestAbortController = React.useRef(null);
  // const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  // const fetchHighlightedDays = (date) => {
  //   const controller = new AbortController();

  //   // Filter the bookings array to get the bookings within the current month
  //   const bookingsInMonth = product.bookings.filter((booking) => {
  //     const bookingDateFrom = dayjs(booking.dateFrom);
  //     const bookingDateTo = dayjs(booking.dateTo);
  //     return (
  //       bookingDateFrom.isSame(date, "month") ||
  //       bookingDateTo.isSame(date, "month") ||
  //       (bookingDateFrom.isBefore(date, "month") &&
  //         bookingDateTo.isAfter(date, "month"))
  //     );
  //   });

  //   // Generate an array of days to highlight for each booking
  //   const daysToHighlight = bookingsInMonth.reduce(
  //     (highlightedDays, booking) => {
  //       const bookingDateFrom = dayjs(booking.dateFrom);
  //       const bookingDateTo = dayjs(booking.dateTo);
  //       const daysInRange = [];

  //       // Loop through each day within the booking range and add it to the array
  //       for (
  //         let date = bookingDateFrom;
  //         date.isBefore(bookingDateTo) || date.isSame(bookingDateTo, "day");
  //         date = date.add(1, "day")
  //       ) {
  //         if (date.isSame(date, "month")) {
  //           daysInRange.push(date.date());
  //         }
  //       }

  //       return [...highlightedDays, ...daysInRange];
  //     },
  //     []
  //   );

  //   setHighlightedDays(daysToHighlight);
  //   setIsLoading(false);

  //   requestAbortController.current = controller;
  // };

  // const fetchHighlightedDays = (date) => {
  //   const controller = new AbortController();

  //   // Filter the bookings array to get the bookings within the current month
  //   const bookingsInMonth = product.bookings.filter((booking) => {
  //     const bookingDateFrom = dayjs(booking.dateFrom);
  //     const bookingDateTo = dayjs(booking.dateTo);
  //     return (
  //       bookingDateFrom.isSame(date, "month") ||
  //       bookingDateTo.isSame(date, "month") ||
  //       (bookingDateFrom.isBefore(date, "month") &&
  //         bookingDateTo.isAfter(date, "month"))
  //     );
  //   });

  //   // Generate an array of days to highlight for each booking
  //   const daysToHighlight = bookingsInMonth.reduce(
  //     (highlightedDays, booking) => {
  //       const bookingDateFrom = dayjs(booking.dateFrom);
  //       const bookingDateTo = dayjs(booking.dateTo);
  //       const daysInRange = [];

  //       // Loop through each day within the booking range and add it to the array
  //       for (
  //         let date = bookingDateFrom;
  //         date.isBefore(bookingDateTo.subtract(1, "day")) ||
  //         date.isSame(bookingDateTo.subtract(1, "day"), "day");
  //         date = date.add(1, "day")
  //       ) {
  //         if (date.isSame(date, "month")) {
  //           daysInRange.push(date.date());
  //         }
  //       }

  //       return [...highlightedDays, ...daysInRange];
  //     },
  //     []
  //   );

  //   setHighlightedDays(daysToHighlight);
  //   setIsLoading(false);

  //   requestAbortController.current = controller;
  // };

  // React.useEffect(() => {
  //   fetchHighlightedDays();
  //   // abort request on unmount
  //   return () => requestAbortController.current?.abort();
  // }, []);

  // const handleMonthChange = (date) => {
  //   if (requestAbortController.current) {
  //     // make sure that you are aborting useless requests
  //     // because it is possible to switch between months pretty quickly
  //     requestAbortController.current.abort();
  //   }

  //   setIsLoading(true);
  //   setHighlightedDays([]);
  //   fetchHighlightedDays(date);
  // };

  return (
    <>
      <button className="CartBtn" id={product.id} onClick={handleOpen}>
        <span className="IconContainer">
          <StyledIcon src={ticket} alt="Ticket" className="ticket" />
        </span>
        <p className="darkText">Book Now!</p>
      </button>
      <Modal
        style={{ overflow: "scroll" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledModal>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StyledH2>From</StyledH2>
            <DateCalendar
              value={fromValue}
              onChange={(newValue) => handleNewFromValue(newValue)}
              loading={isLoading}
              onMonthChange={handleMonthChange}
              slots={{
                day: ServerDay,
              }}
              slotProps={{
                day: {
                  highlightedDays,
                },
              }}
            />
            <StyledH2>To</StyledH2>
            <DateCalendar
              value={toValue}
              onChange={(newValue) => handleNewToValue(newValue)}
              loading={isLoading}
              onMonthChange={handleMonthChange}
              slots={{
                day: ServerDay,
              }}
              slotProps={{
                day: {
                  highlightedDays,
                },
              }}
            />
          </LocalizationProvider> */}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StyledH2>From</StyledH2>
            <DateCalendar
              value={fromValue}
              onChange={(newValue) => setFromValue(newValue)}
              loading={isLoadingFrom}
              onMonthChange={handleMonthChangeFrom}
              slots={{
                day: ServerDay,
              }}
              slotProps={{
                day: {
                  highlightedDays: highlightedDaysFrom,
                },
              }}
            />
            <StyledH2>To</StyledH2>
            <DateCalendar
              value={toValue}
              onChange={(newValue) => setToValue(newValue)}
              loading={isLoadingTo}
              onMonthChange={handleMonthChangeTo}
              slots={{
                day: ServerDay,
              }}
              slotProps={{
                day: {
                  highlightedDays: highlightedDaysTo,
                },
              }}
            />
          </LocalizationProvider>

          <FormControl fullWidth sx={{ marginBottom: "1.5rem" }}>
            <InputLabel id="demo-simple-select-label">Guests</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={guests}
              label="Guests"
              displayEmpty
              onChange={handleGuestChange}
            >
              {[...Array(product.maxGuests)].map((_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Fab
            variant="extended"
            size="medium"
            color="primary"
            style={{ width: "80%" }}
            onClick={() => handleBooking(highlightedDays)}
          >
            Book!
          </Fab>
          <Fab
            variant="extended"
            size="medium"
            color="text.secondary"
            style={{ width: "80%", margin: "1rem 0" }}
            onClick={handleClose}
          >
            Cancel
          </Fab>
        </StyledModal>
      </Modal>
    </>
  );
}

export default AddToCart;
