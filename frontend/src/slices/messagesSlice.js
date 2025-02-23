import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messagesList: [],
};

const messagesSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addMessages: (state, { payload }) => {
      Object.assign(state, { messagesList: payload });
    },
  },
});

export const { addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
