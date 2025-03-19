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
      return { isShow: true, type, channel };
    },
    closeModal: (state) => {
      return { isShow: false, type: null, channel: {} };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
