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

  const [fromValue, setFromValue] = React.useState(null);
  const [toValue, setToValue] = React.useState(null);

  const handleNewFromValue = (newValue) => {
    setFromValue(newValue);
    console.log(newValue, getAdjustedISOString(newValue));
  };

  const handleNewToValue = (newValue) => {
    setToValue(newValue);
    console.log(newValue, getAdjustedISOString(newValue));
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
      // Create a new booking object
      const newBooking = {
        from: getAdjustedISOString(fromValue),
        to: getAdjustedISOString(toValue),
        productId: product.id,
      };

      navigate("/checkoutSuccess", { booking: newBooking });

      handleClose();
    }
  };

  // Function to get ISO string with adjusted time zone offset
  const getAdjustedISOString = (date) => {
    const offsetMinutes = date.utcOffset();
    const adjustedDate = date.add(offsetMinutes, "minute");
    return adjustedDate.toISOString();
  };

  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();

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
          date.isBefore(bookingDateTo) || date.isSame(bookingDateTo, "day");
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

    setHighlightedDays(daysToHighlight);
    setIsLoading(false);

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays();
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
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
          </LocalizationProvider>

          <Fab
            variant="extended"
            size="medium"
            color="primary"
            style={{ width: "80%" }}
            onClick={handleBooking}
          >
            Book!
          </Fab>
          <Fab
            variant="extended"
            size="medium"
            color="text.secondary"
            style={{ width: "80%", marginTop: "1rem" }}
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
