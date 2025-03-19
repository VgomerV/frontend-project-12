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
      const { token, username } = payload;
      localStorage.setItem('token', token);
      state.token = token;
      state.username = username;
    },
    logOut: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.username = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
