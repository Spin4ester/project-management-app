import { createSlice } from '@reduxjs/toolkit';

interface IStateModal {
  main: {
    editBoardModal: boolean;
    createBoardModal: boolean;
    createColumnModal: boolean;
    createTaskModal: boolean;
    deleteItemModal: boolean;
    openDeleteModal: boolean;
  };
  user: { deleteProfileModal: boolean };
}

export const initialState: IStateModal = {
  main: {
    editBoardModal: false,
    createBoardModal: false,
    createColumnModal: false,
    createTaskModal: false,
    deleteItemModal: false,
    openDeleteModal: false,
  },
  user: { deleteProfileModal: false },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openCreateBoardModal(state, action) {
      state.main.createBoardModal = action.payload;
    },
    openEditBoardModal(state, action) {
      state.main.editBoardModal = action.payload;
    },
    openDeleteModal(state, action) {
      state.main.deleteItemModal = action.payload;
    },
    openDeleteProfileModal(state) {
      state.user.deleteProfileModal = true;
    },
    closeDeleteProfileModal(state) {
      state.user.deleteProfileModal = false;
    },
  },
});

export const {
  openDeleteModal,
  openDeleteProfileModal,
  closeDeleteProfileModal,
  openCreateBoardModal,
  openEditBoardModal,
} = modalSlice.actions;

export default modalSlice.reducer;
