import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IStateModal {
  editBoardModal: boolean;
  createBoardModal: boolean;
  createColumnModal: boolean;
  createTaskModal: boolean;
  deleteItemModal: boolean;
}

export const initialState: IStateModal = {
  editBoardModal: false,
  createBoardModal: false,
  createColumnModal: false,
  createTaskModal: false,
  deleteItemModal: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state) {
      state.editBoardModal = true;
    },
  },
});

export const { openModal } = modalSlice.actions;

export default modalSlice.reducer;
