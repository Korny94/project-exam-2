import noProfileImg from "../../assets/noProfileImg.png";
import editBtn from "../../assets/editBtn.png";
import styled from "styled-components";
import { useState } from "react";
import PopupMessage from "../PopupMessage/PopupMessage";

const ALL_PROFILES = process.env.REACT_APP_API_ALL_PROFILES;

function ProfileImgClick() {
  const user = JSON.parse(localStorage.getItem("user"));
  const key = JSON.parse(localStorage.getItem("key"));
  const isImage = user.avatar.url !== null || user.avatar.url !== "";

  const [showPopupMessage, setShowPopupMessage] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

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
            handlePopupMessages(data.errors[0].message);
          } else {
            // Update the avatar URL property with userInput
            user.avatar.url = userInput;

            // Store the updated user object back in local storage
            localStorage.setItem("user", JSON.stringify(user));
            window.location.reload();
          }
        });
    }
  };

  const handlePopupMessages = (message) => {
    setPopupMessage(message);
    setShowPopupMessage(true);
    setTimeout(() => {
      setShowPopupMessage(false);
    }, 3000);
  };

  return (
    <>
      {showPopupMessage && <PopupMessage message={popupMessage} />}
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
    </>
  );
}

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

export default ProfileImgClick;
