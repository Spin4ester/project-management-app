import { configureStore } from '@reduxjs/toolkit';
import boardSlice from 'BoardSlice';
import modalSlice from 'ModalSlice';
import userSlice from 'UserSlice';

export const store = configureStore({
  reducer: {
    board: boardSlice,
    user: userSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
