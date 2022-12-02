import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserBoard, IUserBoardData, IUserBoardDataUpdate } from 'common/types';
import config from 'config';

export const fetchUserBoards = createAsyncThunk(
  'user/boards',
  async function (userId: string, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.url}boardsSet/${userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!token) return null;
      if (!response.ok) {
        throw new Error('Fetch Error!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createUserBoard = createAsyncThunk(
  'user/createBoard',
  async function (board: IUserBoardData, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.url}boards`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(board),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUserBoard = createAsyncThunk(
  'user/deleteBoard',
  async function (boardId: string, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.url}boards/${boardId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserBoard = createAsyncThunk(
  'user/updateBoard',
  async function (board: IUserBoardDataUpdate, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.url}boards/${board._id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(board.body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IStateBoard {
  toBeDeleteBoard: string;
  toBeEditedBoard: string;
  boardPreviewId: string;
  board: string;
  task: string;
  column: string;
  previews: IUserBoard[];
  isLoaded: boolean;
}

export const initialState: IStateBoard = {
  toBeDeleteBoard: 'none',
  toBeEditedBoard: 'none',
  boardPreviewId: 'first',
  board: 'first',
  task: 'first',
  column: 'first',
  previews: [],
  isLoaded: false,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    changeBoard(state, action: PayloadAction<string>) {
      state.board = action.payload;
    },
    changeBoardPreview(state, action: PayloadAction<string>) {
      state.boardPreviewId = action.payload;
    },
    changeIsLoaded(state, action) {
      state.isLoaded = action.payload;
    },
    deleteBoardPreview(state, action) {
      state.toBeDeleteBoard = action.payload;
    },
    editBoardPreview(state, action) {
      state.toBeEditedBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBoards.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchUserBoards.fulfilled, (state, action) => {
        state.previews = action.payload;
        console.log(action.payload + '111111111');
        state.isLoaded = true;
      })
      .addCase(fetchUserBoards.rejected, (state, action) => {
        console.log(action.payload);
        console.log(state.previews);
      })
      .addCase(updateUserBoard.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(updateUserBoard.fulfilled, () => {})
      .addCase(updateUserBoard.rejected, () => {
        // state.searchError = 'Sorry, network issues, we are looking into the problem';
      });
  },
});

export const {
  changeBoard,
  changeIsLoaded,
  changeBoardPreview,
  deleteBoardPreview,
  editBoardPreview,
} = boardSlice.actions;

export default boardSlice.reducer;
