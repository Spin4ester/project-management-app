import { createSlice } from '@reduxjs/toolkit';

interface IStateModal {
  main: {
    editBoardModal: boolean;
    createBoardModal: boolean;
    deleteItemModal: boolean;
    openDeleteModal: boolean;
  };
  user: { deleteProfileModal: boolean };
  board: {
    deleteColumnModal: boolean;
    deleteTaskModal: boolean;
    createColumnModal: boolean;
    createTaskModal: boolean;
    editTaskModal: boolean;
  };
}

export const initialState: IStateModal = {
  main: {
    editBoardModal: false,
    createBoardModal: false,
    deleteItemModal: false,
    openDeleteModal: false,
  },
  user: { deleteProfileModal: false },
  board: {
    deleteColumnModal: false,
    deleteTaskModal: false,
    createColumnModal: false,
    createTaskModal: false,
    editTaskModal: false,
  },
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
    openDeleteColumnModal(state, action) {
      state.board.deleteColumnModal = action.payload;
    },
    openDeleteTaskModal(state, action) {
      state.board.deleteTaskModal = action.payload;
    },
    openCreateColumnModal(state, action) {
      state.board.createColumnModal = action.payload;
    },
    openCreateTaskModal(state, action) {
      state.board.createTaskModal = action.payload;
    },
    openEditTaskModal(state, action) {
      state.board.editTaskModal = action.payload;
    },
  },
});

export const {
  openDeleteModal,
  openDeleteProfileModal,
  closeDeleteProfileModal,
  openCreateBoardModal,
  openEditBoardModal,
  openDeleteColumnModal,
  openDeleteTaskModal,
  openCreateColumnModal,
  openCreateTaskModal,
  openEditTaskModal,
} = modalSlice.actions;

export default modalSlice.reducer;
