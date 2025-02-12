import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  username: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logIn: (state, { payload }) => {
      Object.assign(state, payload);
    },
    logOut: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
