import { createSlice } from '@reduxjs/toolkit';

// export const fetchChannels = createAsyncThunk(
//   'channels/fetchChanels',
//   async () => {
//     const response = await axios.get('api/v1/channels', { headers: { Authorization: `Bearer ${localStorage.token}` } });
//     return response.data;
//   },
// );

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
  },
});

export const { addChannels, setCurrentChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
