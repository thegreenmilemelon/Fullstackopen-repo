import React from "react";

function Notification({ message, msgClassName }) {
  return <div className={msgClassName}>{message}</div>;
}

export default Notification;
