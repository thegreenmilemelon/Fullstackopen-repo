/* eslint-disable react/prop-types */
function Notification({ message }) {
  if (!message.text) {
    return null;
  }
  const notificationClass = message.type === "success" ? "success" : "error";
  return <div className={`${notificationClass} msg`}>{message.text}</div>;
}

export default Notification;
