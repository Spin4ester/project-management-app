import { configureStore } from '@reduxjs/toolkit';
import boardSlice from 'redux/BoardSlice';
import modalSlice from 'redux/ModalSlice';
import userSlice from 'redux/UserSlice';
import selectedBoard from 'redux/SelectedBoardSlice';
// import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    board: boardSlice,
    user: userSlice,
    modal: modalSlice,
    selectedBoard: selectedBoard,
    // api: apiSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
