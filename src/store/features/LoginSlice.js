import { createSlice } from '@reduxjs/toolkit';

export const UserInfo = {
  IdInstance: '',
  API: '',
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
  },
});

export const { setIdInstance, setAPI } = LoginSlice.actions;

export default LoginSlice.reducer;
