import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IStateUser {
  isAuth: boolean;
  userId: string;
}

export const initialState: IStateUser = {
  isAuth: false,
  userId: 'hello',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInUser(state) {
      state.isAuth = true;
    },
  },
});

export const { signInUser } = userSlice.actions;

export default userSlice.reducer;
