import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IUserColumn,
  IUserColumnData,
  IUserColumnOrder,
  IUserTask,
  IUserTaskData,
  IUserTaskUpdate,
} from 'common/types';
import config from 'config';

export const fetchUserColumns = createAsyncThunk(
  'user/columns',
  async function (userId: string, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.url}columnsSet?userId=${userId}`, {
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

export const createColumn = createAsyncThunk(
  'user/createColumn',
  async function (
    { column, boardId }: { column: IUserColumnData; boardId: string },
    { rejectWithValue }
  ) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.url}boards/${boardId}/columns`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(column),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'user/deleteColumn',
  async function (
    { boardId, columnId }: { boardId: string; columnId: string },
    { rejectWithValue }
  ) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.url}boards/${boardId}/columns/${columnId}`, {
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

export const updateColumn = createAsyncThunk(
  'user/updateColumn',
  async function (column: IUserColumn, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${config.api.url}boards/${column.boardId}/columns/${column._id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: column.title, order: column.order }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateColumnOrder = createAsyncThunk(
  'user/updateColumnOrder',
  async function (columnOrder: IUserColumnOrder[], { rejectWithValue }) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.url}columnsSet`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(columnOrder),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserTasks = createAsyncThunk(
  'user/tasks',
  async function (userId: string, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.url}tasksSet?userId=${userId}`, {
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

export const fetchUserColumnTasks = createAsyncThunk(
  'user/columnTasks',
  async function (
    { boardId, columnId }: { boardId: string; columnId: string },
    { rejectWithValue }
  ) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.url}boards/${boardId}/columns/${columnId}/tasks`, {
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

export const createTask = createAsyncThunk(
  'user/createTask',
  async function (
    { task, boardId, columnId }: { task: IUserTaskData; boardId: string; columnId: string },
    { rejectWithValue }
  ) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.url}boards/${boardId}/columns/${columnId}/tasks`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'user/deleteTask',
  async function (
    { boardId, columnId, taskId }: { boardId: string; columnId: string; taskId: string },
    { rejectWithValue }
  ) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${config.api.url}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTask = createAsyncThunk(
  'user/updateTask',
  async function (
    {
      boardId,
      columnId,
      taskId,
      task,
    }: { boardId: string; columnId: string; taskId: string; task: IUserTaskUpdate },
    { rejectWithValue }
  ) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${config.api.url}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(task),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IStateBoard {
  isLoading: boolean;
  toBeDeleteColumn: string;
  toBeDeleteTask: string;
  toBeCreateTaskColumn: string;
  toBeEditTask: string;
  columns: IUserColumn[];
  tasks: IUserTask[];
}

export const initialState: IStateBoard = {
  isLoading: false,
  toBeDeleteColumn: 'none',
  toBeDeleteTask: 'none',
  toBeCreateTaskColumn: 'none',
  toBeEditTask: 'none',
  columns: [],
  tasks: [],
};

export const selectedBoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    deleteBoardColumn(state, action) {
      state.toBeDeleteColumn = action.payload;
    },
    createColumnTask(state, action) {
      state.toBeCreateTaskColumn = action.payload;
    },
    deleteBoardTask(state, action) {
      state.toBeDeleteTask = action.payload.id;
      state.toBeDeleteColumn = action.payload.columnId;
    },
    editBoardTask(state, action) {
      state.toBeEditTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserColumns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserColumns.fulfilled, (state, action) => {
        state.columns = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(updateColumnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColumnOrder.fulfilled, (state, action) => {
        state.columns = action.payload;
        state.isLoading = false;
      });
  },
});

export const { deleteBoardColumn, createColumnTask, deleteBoardTask, editBoardTask } =
  selectedBoardSlice.actions;

export default selectedBoardSlice.reducer;
