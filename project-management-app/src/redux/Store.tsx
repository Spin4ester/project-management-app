import { configureStore } from '@reduxjs/toolkit';
import boardSlice from 'redux/BoardSlice';
import modalSlice from 'redux/ModalSlice';
import userSlice from 'redux/UserSlice';

export const store = configureStore({
  reducer: {
    board: boardSlice,
    user: userSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
