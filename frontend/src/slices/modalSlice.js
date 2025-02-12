import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    typeModal: null,
    idChannel: null,
    nameChannel: '',
  },
  reducers: {
    setAddChannelActive: (state) => {
      const stateModal = state.addChannel.state;
      state.addChannel.state = stateModal === 'close' ? 'open' : 'close';
    },
    setIsControlChannelActive: (state, action) => {
      const stateModal = state.controlChannel.state;
      const id = action.payload;
      const currentId = state.controlChannel.currentChannelId;

      state.controlChannel.state = id !== currentId || stateModal === 'close' ? 'open' : 'close';
      state.controlChannel.currentChannelId = id;
    },
  },
});

export const { setAddChannelActive, setIsControlChannelActive } = modalsSlice.actions;

export default modalsSlice.reducer;
