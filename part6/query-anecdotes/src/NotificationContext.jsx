/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

const NoticationContext = createContext();

export const NoticationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NoticationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NoticationContext.Provider>
  );
};

export default NoticationContext;
