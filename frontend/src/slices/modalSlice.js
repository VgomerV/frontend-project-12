import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShow: false,
  type: null,
  channel: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { type, channel = {} } = payload;
      state.isShow = true;
      state.type = type;
      state.channel = channel;
    },
    closeModal: (state) => {
      state.isShow = false;
      state.type = null;
      state.channel = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
