import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return "";
    },
  },
});

export const { showNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (content, time) => {
  return (dispatch) => {
    dispatch(showNotification(content));
    setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};
export default notificationSlice.reducer;
