import { configureStore } from '@reduxjs/toolkit';
import channelsApi from '../api/channelsApi.js';
import messagesApi from '../api/messagesApi.js';
import authReducer from './authSlice.js';
import modalsReducer from './modalSlice.js';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    modals: modalsReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware),
});

export default store;
