import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const response = await axios.get('api/v1/messages', { headers: { Authorization: `Bearer ${localStorage.token}` } });
    return response.data;
  },
);

const messagesAdapter = createEntityAdapter({});

const messagesSlice = createSlice({
  name: 'channels',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    testReducerMessages: () => {
      console.log('>>>>> test reducer messages work!');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action);
      });
  },
});

export const { testReducerMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
