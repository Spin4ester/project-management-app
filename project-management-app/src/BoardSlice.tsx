import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserBoard } from 'common/types';
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

// export async function getAllUserBoards(user: string) {
//   const url = `${config.api.url}boardsSet/${user}`;
//   const token = localStorage.getItem('token');
//   if (!token) return null;
//   try {
//     const res = await fetch(url, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const userBoards = await res.json();
//     return userBoards;
//   } catch (error) {
//     console.log(error);
//   }
// }

interface IStateBoard {
  board: string;
  task: string;
  column: string;
  previews: IUserBoard[];
  isLoaded: boolean;
}

export const initialState: IStateBoard = {
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBoards.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchUserBoards.fulfilled, (state, action) => {
        state.previews = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchUserBoards.rejected, (state) => {
        // state.searchError = 'Sorry, network issues, we are looking into the problem';
      });
  },
});

export const { changeBoard } = boardSlice.actions;

export default boardSlice.reducer;
