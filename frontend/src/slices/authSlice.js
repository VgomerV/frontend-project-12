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
      localStorage.setItem('token', payload.token);
      return payload;
    },
    logOut: () => {
      localStorage.removeItem('token');
      return initialState;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
