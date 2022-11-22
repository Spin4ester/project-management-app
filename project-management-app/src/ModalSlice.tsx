import { createSlice } from '@reduxjs/toolkit';

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
    openCreateBoardModal(state, action) {
      state.createBoardModal = action.payload;
    },
    openEditBoardModal(state, action) {
      state.editBoardModal = action.payload;
    },
    openDeleteModal(state, action) {
      state.deleteItemModal = action.payload;
    },
  },
});

export const { openCreateBoardModal, openEditBoardModal, openDeleteModal } = modalSlice.actions;

export default modalSlice.reducer;
