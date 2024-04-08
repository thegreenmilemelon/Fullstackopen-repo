/* eslint-disable react/prop-types */
import { useContext } from "react";
import NoticationContext from "../NotificationContext";

const Notification = ({ message }) => {
  const [notification, dispatch] = useContext(NoticationContext);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  // eslint-disable-next-line no-constant-condition
  // if (true) return null;

  return <div style={style}>Notification {message}</div>;
};

export default Notification;
