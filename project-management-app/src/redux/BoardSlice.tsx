import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IStateBoard {
  board: string;
  task: string;
  column: string;
}

export const initialState: IStateBoard = {
  board: 'first',
  task: 'first',
  column: 'first',
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    changeBoard(state, action: PayloadAction<string>) {
      state.board = action.payload;
    },
  },
});

export const { changeBoard } = boardSlice.actions;

export default boardSlice.reducer;
