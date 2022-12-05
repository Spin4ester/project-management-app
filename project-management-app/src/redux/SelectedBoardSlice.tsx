import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IErrorResponse,
  IUserColumn,
  IUserColumnData,
  IUserColumnOrder,
  IUserTask,
  IUserTaskData,
  IUserTaskOrder,
  IUserTaskUpdate,
} from 'common/types';
import config from 'config';

export const fetchBoardColumns = createAsyncThunk(
  'user/columns',
  async function (boardId: string, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.url}boards/${boardId}/columns`, {
        method: 'GET',
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
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
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
      if (!token) return null;
      if (!response.ok) {
        return rejectWithValue({ statusCode: response.status, message: response.statusText });
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
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
      if (!token) return null;
      if (!response.ok) {
        return rejectWithValue({ statusCode: response.status, message: response.statusText });
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
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
      if (!token) return null;
      if (!response.ok) {
        return rejectWithValue({ statusCode: response.status, message: response.statusText });
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
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
      if (!token) return null;
      if (!response.ok) {
        return rejectWithValue({ statusCode: response.status, message: response.statusText });
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
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
        return rejectWithValue({ statusCode: response.status, message: response.statusText });
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
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
        return rejectWithValue({ statusCode: response.status, message: response.statusText });
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
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
      if (!token) return null;
      if (!response.ok) {
        return rejectWithValue({ statusCode: response.status, message: response.statusText });
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
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
      if (!token) return null;
      if (!response.ok) {
        return rejectWithValue({ statusCode: response.status, message: response.statusText });
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
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
      if (!token) return null;
      if (!response.ok) {
        return rejectWithValue({ statusCode: response.status, message: response.statusText });
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
    }
  }
);

export const updateTaskOrder = createAsyncThunk(
  'user/updateTaskOrder',
  async function (taskOrder: IUserTaskOrder[], { rejectWithValue }) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.url}tasksSet`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskOrder),
      });
      if (!token) return null;
      if (!response.ok) {
        return rejectWithValue({ statusCode: response.status, message: response.statusText });
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
    }
  }
);

export const fetchBoard = createAsyncThunk(
  'user/board',
  async function (boardId: string, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.url}boards/${boardId}`, {
        method: 'GET',
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
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
    }
  }
);

interface IStateBoard {
  isLoading: boolean;
  isAuthError: boolean;
  toBeDeleteColumn: string;
  toBeDeleteTask: string;
  toBeCreateTaskColumn: string;
  toBeEditTask: string;
  toBeAddTaskColumn: IUserColumn[];
  columns: IUserColumn[];
  tasks: IUserTask[];
  boardTitle: string;
  serverError: { statusCode: number; message: string };
}

export const initialState: IStateBoard = {
  isLoading: false,
  isAuthError: false,
  toBeDeleteColumn: 'none',
  toBeDeleteTask: 'none',
  toBeCreateTaskColumn: 'none',
  toBeEditTask: 'none',
  toBeAddTaskColumn: [],
  columns: [],
  tasks: [],
  boardTitle: '',
  serverError: { statusCode: 0, message: '' },
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
    removeAuthError(state) {
      state.isAuthError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardColumns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBoardColumns.fulfilled, (state, action) => {
        state.columns = action.payload;
        state.isLoading = false;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(fetchBoardColumns.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(fetchUserTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(updateColumnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColumnOrder.fulfilled, (state, action) => {
        state.columns = action.payload;
        state.isLoading = false;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(updateColumnOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(fetchUserColumnTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserColumnTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.toBeAddTaskColumn = action.payload.sort(
          (task1: IUserTask, task2: IUserTask) => task2.order - task1.order
        );
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(fetchUserColumnTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(updateTaskOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskOrder.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) => {
          const changedTask = action.payload.find((el: IUserTask) => el._id === task._id);
          return changedTask ? changedTask : task;
        });
        state.isLoading = false;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(updateTaskOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(createColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColumn.fulfilled, (state) => {
        state.isLoading = false;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(createColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColumn.fulfilled, (state) => {
        state.isLoading = false;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(updateColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColumn.fulfilled, (state) => {
        state.isLoading = false;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(updateColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.isLoading = false;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.isLoading = false;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.isLoading = false;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(fetchBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.boardTitle = action.payload ? action.payload.title : '';
        state.isLoading = false;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(fetchBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      });
  },
});

export const {
  deleteBoardColumn,
  createColumnTask,
  deleteBoardTask,
  editBoardTask,
  removeAuthError,
} = selectedBoardSlice.actions;

export default selectedBoardSlice.reducer;
