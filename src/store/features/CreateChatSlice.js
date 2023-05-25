import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  number: '',
  text: '',
  messagesTo: [],
  messagesFrom: [],
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
    setMessagesTo: (state, action) => {
      state.messagesTo = [action.payload, ...state.messagesTo];
    },
    setMessagesFrom: (state, action) => {
      state.messagesFrom = [action.payload, ...state.messagesFrom];
    },
  },
});

export const { setNumber, setText, setMessagesTo, setMessagesFrom } = CreateChatSlice.actions;

export default CreateChatSlice.reducer;
