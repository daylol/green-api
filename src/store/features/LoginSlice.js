import { createSlice } from '@reduxjs/toolkit';

export const UserInfo = {
  IdInstance: '',
  API: '',
  UserNumber: '',
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState: UserInfo,
  reducers: {
    setIdInstance: (state, action) => {
      state.IdInstance = action.payload;
    },
    setAPI: (state, action) => {
      state.API = action.payload;
    },
    setUserNumber: (state, action) => {
      state.UserNumber = action.payload;
    },
  },
});

export const { setIdInstance, setAPI, setUserNumber } = LoginSlice.actions;

export default LoginSlice.reducer;
