import { configureStore } from '@reduxjs/toolkit';
import channelsApi from '../api/channelsApi';
import messagesApi from '../api/messagesApi';
import authReducer from './authSlice';
import currentChannelReducer from './currentChannelSlice.js';
import modalReducer from './modalSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    currentChannel: currentChannelReducer,
    modal: modalReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messagesApi.middleware),
});

export default store;
