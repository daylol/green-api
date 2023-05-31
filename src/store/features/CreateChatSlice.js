import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  number: '',
  text: '',
  messages: [],
  id: undefined,
  notifications: [],
};

export const CreateChatSlice = createSlice({
  name: 'createChat',
  initialState,
  reducers: {
    setNumber: (state, action) => {
      state.number = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { setNumber, setText, setMessages, setId, setNotifications } = CreateChatSlice.actions;

export default CreateChatSlice.reducer;
