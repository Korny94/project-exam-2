import "./PopupMessage.scss";

function PopupMessage({ message }) {
  return (
    <div className="popupMessage">
      <p>{message}</p>
    </div>
  );
}

export default PopupMessage;
