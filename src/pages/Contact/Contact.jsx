import "./Contact.scss";
import PopupMessage from "../../Components/PopupMessage/PopupMessage.jsx";
import React, { useState } from "react";
import Loader from "../../Components/Loader/Loader.jsx";

function Contact() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true); // Initially set to true
  const [showEmailPopup, setShowEmailPopup] = useState(false); // State to control popup visibility
  const [showNamePopup, setShowNamePopup] = useState(false); // State to control popup visibility
  const [showPopupMessage, setShowPopupMessage] = useState(false); // State to control popup visibility
  const [showLoader, setShowLoader] = useState(false); // State to control loader visibility

  const validateEmail = (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value.trim());
  };

  const handleEmailChange = (e) => {
    setShowNamePopup(false);
    const { value } = e.target;
    setEmail(value);
    if (validateEmail(value) && value.length !== 0) {
      setIsValid(true);
      setShowEmailPopup(false); // Hide the popup when email is valid
      e.target.style.border = "1px solid green";
    } else {
      e.target.style.border = "1px solid #414141";
    }
    if (value.length === 0) {
      setShowEmailPopup(false); // Hide popup if email is empty
    }
  };

  const handleEmailBlur = (e) => {
    const { value } = e.target;
    setIsValid(validateEmail(value));
    if (value.length !== 0) {
      setShowEmailPopup(!validateEmail(value)); // Show popup if email is invalid
      if (validateEmail(value)) {
        e.target.style.border = "1px solid green";
      } else {
        e.target.style.border = "1px solid red";
      }
    } else {
      setShowEmailPopup(false); // Hide popup if email is empty
    }
  };

  function resetBorders() {
    // Select all input and textarea elements within the form
    const formElements = document.querySelectorAll(
      ".form input, .form textarea"
    );

    // Loop through each element and reset the border style
    formElements.forEach((element) => {
      if (element.id !== "search") {
        element.style.border = "1px solid #414141";
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission for now

    const fullName = document.getElementById("name");
    const subject = document.getElementById("subject");
    const message = document.getElementById("textarea");
    const email = document.getElementById("email");

    // Check if name meets the necessary requirements
    if (fullName.value.length < 3) {
      setShowNamePopup(true); // Show name popup
      fullName.style.border = "1px solid red"; // Set border color to red
      return; // Exit function early
    } else if (!validateEmail(email.value) || email.value.length === 0) {
      setShowEmailPopup(true); // Show email popup
      email.style.border = "1px solid red"; // Set border color to red
      return; // Exit function early
    } else if (subject.value.length < 3) {
      setShowNamePopup(true); // Show subject popup
      subject.style.border = "1px solid red"; // Set border color to red
      return; // Exit function early
    } else if (message.value.length < 3) {
      setShowNamePopup(true); // Show message popup
      message.style.border = "1px solid red"; // Set border color to red
      return; // Exit function early
    } else {
      setShowLoader(true); // Show loader before form submission
      setTimeout(() => {
        // Simulate form submission delay
        setShowLoader(false); // Hide loader after simulated submission
        setEmail("");
        setIsValid(true);
        setShowEmailPopup(false);
        setShowNamePopup(false);
        resetBorders();
        e.target.reset();
        setShowPopupMessage(true);
        setTimeout(() => {
          setShowPopupMessage(false);
        }, 1500);
      }, 1500);
    }
  };

  function validateName(e) {
    e.preventDefault();

    setShowNamePopup(false);
    setShowEmailPopup(false);

    if (e.target.value.length > 2) {
      e.target.style.border = "1px solid green";
    } else {
      e.target.style.border = "1px solid #414141";
    }
  }

  function handleNameBlur(e) {
    e.preventDefault();
    const { value } = e.target;

    if (value.length < 3 && value.length > 0) {
      setShowNamePopup(true);
      e.target.style.border = "1px solid red";
    } else {
      setShowNamePopup(false);
    }
    if (value.length > 2) {
      e.target.style.border = "1px solid green";
    }
  }

  return (
    <div className="form-container">
      {!showLoader && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              required
              placeholder="Full Name"
              name="name"
              id="name"
              type="text"
              onBlur={handleNameBlur}
              onChange={validateName}
            />
            {showNamePopup && (
              <PopupMessage message="Must contain minimum 3 characters" /> // Pass onClose prop to handle popup close
            )}{" "}
          </div>
          <div className="form-group">
            <input
              required
              name="email"
              placeholder="Email Address"
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange} // Handle email input change
              onBlur={handleEmailBlur} // Validate email on blur and trigger popup
            />
            {showEmailPopup && !isValid && (
              <PopupMessage message="Invalid email address" /> // Pass onClose prop to handle popup close
            )}{" "}
            {/* Conditionally render PopupMessage if email is invalid and showPopup is true */}
          </div>
          <div className="form-group">
            <input
              required
              name="subject"
              placeholder="Subject"
              id="subject"
              type="text"
              onBlur={handleNameBlur}
              onChange={validateName}
            />
            {showNamePopup && (
              <PopupMessage message="Must contain minimum 3 characters" /> // Pass onClose prop to handle popup close
            )}{" "}
          </div>
          <div className="form-group">
            <textarea
              required
              placeholder="What can we help you with?"
              cols="50"
              rows="10"
              id="textarea"
              name="textarea"
              onBlur={handleNameBlur}
              onChange={validateName}
            ></textarea>
            {showNamePopup && (
              <PopupMessage message="Must contain minimum 3 characters" /> // Pass onClose prop to handle popup close
            )}{" "}
          </div>
          <button type="submit" className="form-submit-btn">
            Submit
          </button>
        </form>
      )}
      {showPopupMessage && <PopupMessage message="Message sent successfully" />}
      {showLoader && <Loader />}
    </div>
  );
}

export default Contact;
