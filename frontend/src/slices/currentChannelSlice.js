import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelID: '1',
  currentChannelName: 'general',
};

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      const { id, name } = payload;
      return { currentChannelID: id, currentChannelName: name };
    },
    resetCurrentChannel: () => initialState,
  },
});

export const { setCurrentChannel, resetCurrentChannel } = currentChannelSlice.actions;

export default currentChannelSlice.reducer;
