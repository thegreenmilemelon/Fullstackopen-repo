import { createSlice, current } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      if (state === null) {
        return action.payload;
      }
      console.log("Reducer state:", current(state));
      return action.payload;
    },
  },
});

export const { showNotification } = notificationSlice.actions;

export const setNotification = (content, time) => {
  return (dispatch) => {
    dispatch(showNotification(content));
    setTimeout(() => {
      dispatch(showNotification(null));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
