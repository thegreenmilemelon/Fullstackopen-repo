import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setAllUsers } = allUsersSlice.actions;

export default allUsersSlice.reducer;

export const initializeAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setAllUsers(users));
    console.log("All users", users);
  };
};
