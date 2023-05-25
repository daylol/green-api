import { configureStore } from '@reduxjs/toolkit';
import LoginSlice from './features/LoginSlice';
import CreateChatSlice from './features/CreateChatSlice';

export const store = configureStore({
  reducer: {
    user: LoginSlice,
    create: CreateChatSlice,
  },
});
