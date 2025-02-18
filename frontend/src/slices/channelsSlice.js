import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsList: [],
  currentChannelID: '1',
  currentChannelName: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, { payload }) => {
      const { channels } = payload;
      const [currentChannel] = channels
        .filter((channel) => channel.id === state.currentChannelID);
      Object.assign(state, {
        channelsList: channels,
        currentChannelName: currentChannel.name,
      });
    },
    setCurrentChannel: (state, { payload }) => {
      const { id, name } = payload;
      Object.assign(state, {
        currentChannelID: id,
        currentChannelName: name,
      });
    },
    resetCurrentChannel: (state) => {
      Object.assign(state, {
        currentChannelID: '1',
        currentChannelName: null,
      });
    },
  },
});

export const { addChannels, setCurrentChannel, resetCurrentChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
