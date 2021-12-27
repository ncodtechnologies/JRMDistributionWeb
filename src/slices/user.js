import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = { as: "ass" };
    },
    unsetUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;

export function setUserData(user) {
  return async (dispatch) => {
    dispatch(setUser(user));
  };
}
