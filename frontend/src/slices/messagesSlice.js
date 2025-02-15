import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchMessages = createAsyncThunk(
//   'messages/fetchMessages',
//   async () => {
//     const response = await axios.get('api/v1/messages', { headers: { Authorization: `Bearer ${localStorage.token}` } });
//     return response.data;
//   },
// );

// const messagesAdapter = createEntityAdapter({});

const initialState = {
  messagesList: [],
};

const messagesSlice = createSlice({
  name: 'channels',
  // initialState: messagesAdapter.getInitialState(),
  initialState,
  reducers: {
    addMessages: (state, { payload }) => {
      Object.assign(state, { messagesList: payload });
    },
  },
});

export const { addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
