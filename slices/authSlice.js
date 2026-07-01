import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo:
    typeof window !== 'undefined' && localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = {
        ...action.payload,
        token: action.payload.token,
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
      }
    },

    logout: (state) => {
      state.userInfo = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('userInfo');
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
