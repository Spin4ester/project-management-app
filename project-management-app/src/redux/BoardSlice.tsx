import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IErrorResponse, IUserBoard, IUserBoardData, IUserBoardDataUpdate } from 'common/types';
import { setHeaders } from 'common/utils';
import config from 'config';

export const fetchUserBoards = createAsyncThunk(
  'user/boards',
  async function (userId: string, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) return null;
      const response = await fetch(`${config.api.url}boardsSet/${userId}`, {
        method: 'GET',
        headers: setHeaders(token),
      });
      if (!response.ok) {
        return rejectWithValue({ statusCode: response.status, message: response.statusText });
      }
      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
    }
  }
);

export const createUserBoard = createAsyncThunk(
  'user/createBoard',
  async function (board: IUserBoardData, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('token') || '';
      const response = await fetch(`${config.api.url}boards`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(board),
      });
      if (!response.ok) {
        return rejectWithValue({ statusCode: response.status, message: response.statusText });
      }
      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
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
      if (!token) return null;
      if (!response.ok) {
        return rejectWithValue({ statusCode: response.status, message: response.statusText });
      }
      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
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
      if (!token) return null;
      if (!response.ok) {
        if (response.status === 403) throw new Error('403');
        throw new Error('Fetch Error!');
      }
      if (!response.ok) {
        return rejectWithValue({ statusCode: response.status, message: response.statusText });
      }
      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
    }
  }
);

interface IStateBoard {
  toBeDeleteBoard: string;
  toBeEditedBoard: string;
  boardPreviewId: string;
  board: string;
  previews: IUserBoard[];
  isLoaded: boolean;
  isLoading: boolean;
  serverError: { statusCode: number; message: string };
}

export const initialState: IStateBoard = {
  toBeDeleteBoard: 'none',
  toBeEditedBoard: 'none',
  boardPreviewId: 'init',
  board: 'init',
  previews: [],
  isLoaded: false,
  isLoading: false,
  serverError: { statusCode: 0, message: '' },
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
        state.isLoading = true;
      })
      .addCase(fetchUserBoards.fulfilled, (state, action) => {
        !Array.isArray(action.payload) ? (action.payload = []) : (state.previews = action.payload),
          (state.isLoaded = true),
          (state.serverError = { statusCode: 0, message: '' }),
          (state.isLoading = false);
      })
      .addCase(fetchUserBoards.rejected, (state, action) => {
        state.isLoaded = false;
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(updateUserBoard.pending, (state) => {
        state.isLoaded = false;
        state.isLoading = true;
      })
      .addCase(updateUserBoard.fulfilled, (state) => {
        state.isLoading = false;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(updateUserBoard.rejected, (state, action) => {
        state.isLoaded = false;
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(createUserBoard.pending, (state) => {
        state.isLoaded = false;
        state.isLoading = true;
      })
      .addCase(createUserBoard.fulfilled, (state) => {
        state.isLoading = false;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(createUserBoard.rejected, (state, action) => {
        state.isLoaded = false;
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(deleteUserBoard.pending, (state) => {
        state.isLoaded = false;
        state.isLoading = true;
      })
      .addCase(deleteUserBoard.fulfilled, (state) => {
        state.isLoading = false;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(deleteUserBoard.rejected, (state, action) => {
        state.isLoaded = false;
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
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
