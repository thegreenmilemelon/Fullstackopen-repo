import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);

  if (!message) {
    return null;
  }
  const notificationClass = message.type === "success" ? "success" : "error";

  return <div className={`${notificationClass} msg`}>{message.text}</div>;
};

export default Notification;
