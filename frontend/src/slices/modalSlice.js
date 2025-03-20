import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShow: false,
  type: null,
  channels: [],
  selectedChannel: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { type, channels = [], selectedChannel = {} } = payload;
      return {
        isShow: true,
        type,
        channels,
        selectedChannel,
      };
    },
    closeModal: () => initialState,
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
