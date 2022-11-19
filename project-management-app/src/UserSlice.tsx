import { createSlice } from '@reduxjs/toolkit';

interface IStateUser {
  isAuth: boolean;
  userId: string;
  userName: string;
}

export const initialState: IStateUser = {
  isAuth: false,
  userName: 'User',
  userId: 'hello',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInUser(state) {
      state.isAuth = true;
    },
    signOutUser(state) {
      state.isAuth = false;
      state.userName = 'User';
    },
  },
});

export const { signInUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
