import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChanels',
  async () => {
    const response = await axios.get('api/v1/channels', { headers: { Authorization: `Bearer ${localStorage.token}` } });
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ currentChannelID: 1 }),
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action);
      });
  },
});

export const { setCurrentChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
