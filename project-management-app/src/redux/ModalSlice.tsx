import { createSlice } from '@reduxjs/toolkit';

interface IStateModal {
  main: {
    editBoardModal: boolean;
    createBoardModal: boolean;
    createColumnModal: boolean;
    createTaskModal: boolean;
    deleteItemModal: boolean;
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
  },
  user: { deleteProfileModal: false },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state) {
      state.main.editBoardModal = true;
    },
    openDeleteProfileModal(state) {
      state.user.deleteProfileModal = true;
    },
    closeDeleteProfileModal(state) {
      state.user.deleteProfileModal = false;
    },
  },
});

export const { openModal, openDeleteProfileModal, closeDeleteProfileModal } = modalSlice.actions;
export default modalSlice.reducer;
