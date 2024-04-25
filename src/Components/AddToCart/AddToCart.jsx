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

  const [guests, setGuests] = React.useState(1);

  const handleGuestChange = (event) => {
    setGuests(event.target.value);
  };

  const key = JSON.parse(localStorage.getItem("key"));
  const user = JSON.parse(localStorage.getItem("user"));

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
      // Check if any dates between fromValue and toValue are disabled or highlighted
      const datesInRange = [];
      let currentDate = dayjs(fromValue).startOf("day"); // Ensure consistent treatment of start date without timezone adjustment
      const endOfDayToValue = dayjs(toValue).endOf("day"); // Adjusted to get the end of the day for toValue

      while (
        currentDate.isBefore(endOfDayToValue) || // Adjusted condition to include the end of the day for toValue
        currentDate.isSame(endOfDayToValue, "day")
      ) {
        datesInRange.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.add(1, "day");
      }

      console.log("Dates in range:", datesInRange);

      // Convert allBookedDates to a Set for faster lookup
      const bookedDatesSet = new Set(allBookedDates);

      // Initialize a variable to track if any conflicting dates are found
      let conflictFound = false;

      // Loop through each date in datesInRange and check if it's in bookedDatesSet
      datesInRange.forEach((isoDateString) => {
        // Iterate over ISO string dates
        if (bookedDatesSet.has(isoDateString)) {
          conflictFound = true;
          // If a conflicting date is found, you can handle it here
          // For example, you can display an alert message or log it
          console.log(`Conflict found on date: ${isoDateString}`);
        }
      });

      // If conflictFound is true, there are conflicting dates; otherwise, there are none
      if (conflictFound) {
        alert("Some dates between 'from' and 'to' are already booked.");
        // Optionally, you can return or handle further execution of the booking process
        return;
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
          return response.json();
        })

        .then((data) => {
          console.log("Booking created:", data);
          if (data.errors) {
            alert(data.errors[0].message);
          } else {
            product.bookings.push(data.data);

            // Store the cleaned product in localStorage
            localStorage.setItem("productInfo", JSON.stringify(product));
            navigate("/checkoutSuccess");
          }
        })

        .catch((error) => {
          console.error("Error creating booking:", error);
        });
    }
  };

  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const getAdjustedISOString = (date) => {
    const offsetMinutes = date.utcOffset();
    const adjustedDate = date.add(offsetMinutes, "minute");
    return adjustedDate.toISOString();
  };

  const getAllDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = dayjs(startDate).startOf("day");
    const end = dayjs(endDate).startOf("day");

    const timezoneOffset = new Date(startDate).getTimezoneOffset() * 60000;

    while (currentDate.isBefore(end, "day") || currentDate.isSame(end, "day")) {
      // Adjust the currentDate if the time is 22:00:00.000Z or later
      if (currentDate.hour() >= 22) {
        currentDate = currentDate.subtract(1, "day").startOf("day");
      }

      // Apply timezone offset
      currentDate = currentDate.subtract(timezoneOffset, "millisecond");

      const formattedDate = currentDate.format("YYYY-MM-DD");
      dates.push(formattedDate);

      // Increment currentDate by one day, but only if it's not already the end date
      if (!currentDate.isSame(end, "day")) {
        currentDate = currentDate.add(1, "day").startOf("day");
      } else {
        break; // Exit the loop if currentDate is the same as the end date
      }
    }

    return dates;
  };

  const allBookedDates = product.bookings.reduce((dates, booking) => {
    const bookingDates = getAllDatesBetween(booking.dateFrom, booking.dateTo);
    return dates.concat(bookingDates);
  }, []);

  console.log("All booked dates:", allBookedDates);

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

    // Filter the bookings array to get the bookings within the current month
    const bookingsInMonth = product.bookings.filter((booking) => {
      const bookingDateFrom = dayjs(booking.dateFrom).startOf("day"); // Truncate time part
      const bookingDateTo = dayjs(booking.dateTo).startOf("day"); // Truncate time part

      return (
        (bookingDateFrom.isSame(date, "month") ||
          bookingDateFrom.isBefore(date, "month")) &&
        (bookingDateTo.isSame(date, "month") ||
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
          let currentDate = bookingDateFrom;
          currentDate.isBefore(bookingDateTo) ||
          currentDate.isSame(bookingDateTo, "day"); // Adjusted condition to include dateTo
          currentDate = currentDate.add(1, "day")
        ) {
          if (currentDate.isSame(date, "month")) {
            daysInRange.push(currentDate.date());
          }
        }

        return [...highlightedDays, ...daysInRange];
      },
      []
    );

    setHighlightedDays(daysToHighlight);
    setIsLoading(false);
    console.log("Highlighted days:", daysToHighlight);

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
      dayjs(date).startOf("month"), // Adjust to start of month
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
      dayjs(date).startOf("month"), // Adjust to start of month
      setIsLoadingTo,
      setHighlightedDaysTo,
      requestAbortControllerTo
    );
  };

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
