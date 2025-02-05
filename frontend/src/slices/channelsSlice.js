import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChanels',
  async () => {
    const response = await axios.get('api/v1/channels', { headers: { Authorization: `Bearer ${localStorage.token}` } });
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter({});

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    testReducerChannels: () => {
      console.log('>>>>> test reducer channels work!');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action);
      });
  },
});

export const { testReducerChannels } = channelsSlice.actions;

export default channelsSlice.reducer;
