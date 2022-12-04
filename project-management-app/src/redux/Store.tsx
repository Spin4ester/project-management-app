import { configureStore } from '@reduxjs/toolkit';
import boardSlice from 'redux/BoardSlice';
import modalSlice from 'redux/ModalSlice';
import userSlice from 'redux/UserSlice';
import serverErrorSlice from './ServerErorsSlice';

export const store = configureStore({
  reducer: {
    board: boardSlice,
    user: userSlice,
    modal: modalSlice,
    serverError: serverErrorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
