import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import config from 'config';
import { IErrorResponse, INewUser, IUserLogin, IUserUpdate } from 'common/types';
import { setHeaders } from 'common/utils';

interface IStateUser {
  isAuth: boolean;
  userId: string;
  userName: string;
  userLogin: string;
  serverError: { statusCode: number; message: string };
}

export const initialState: IStateUser = {
  isAuth: !!localStorage.getItem('token'),
  userName: localStorage.getItem('userName') || '',
  userId: localStorage.getItem('userId') || '',
  userLogin: localStorage.getItem('userLogin') || '',
  serverError: { statusCode: 0, message: '' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInUser(state) {
      state.isAuth = true;
    },
    updateUserLogin(state, action: PayloadAction<string>) {
      state.userLogin = action.payload;
    },
    signOutUser(state) {
      state.isAuth = false;
      state.userName = '';
      state.userId = '';
      state.userLogin = '';
      state.serverError = { statusCode: 0, message: '' };
    },
    updateUserInfo(state, action: PayloadAction<{ _id: string; name: string }>) {
      state.userId = action.payload._id;
      state.userName = action.payload.name;
    },
    clearUserError(state) {
      state.serverError = { statusCode: 0, message: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSigninFetch.fulfilled, (state) => {
        // state.isAuth = true;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(userSigninFetch.rejected, (state, action) => {
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(fetchAllUsers.fulfilled, (state) => {
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(userSignupFetch.fulfilled, (state, action) => {
        state.userId = action.payload._id;
        state.userName = action.payload.name;
        state.userLogin = action.payload.login;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(userSignupFetch.rejected, (state, action) => {
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(updateUserOnServer.fulfilled, (state, action) => {
        state.userName = action.payload.name;
        state.userLogin = action.payload.login;
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(updateUserOnServer.rejected, (state, action) => {
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      })
      .addCase(deleteUserFromServer.fulfilled, (state) => {
        state.isAuth = false;
        state.userName = '';
        state.userId = '';
        state.userLogin = '';
        state.serverError = { statusCode: 0, message: '' };
      })
      .addCase(deleteUserFromServer.rejected, (state, action) => {
        state.serverError.statusCode = (action.payload as IErrorResponse).statusCode;
        state.serverError.message = (action.payload as IErrorResponse).message;
      });
  },
});

export const userSignupFetch = createAsyncThunk(
  'signup',
  async (newUser: INewUser, { rejectWithValue }) => {
    const url = `${config.api.url}auth/signup`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: setHeaders(),
        body: JSON.stringify(newUser),
      });
      if (!res.ok) {
        return rejectWithValue({ statusCode: res.status, message: res.statusText });
      }
      const signupData = await res.json();
      localStorage.setItem('userId', signupData._id);
      localStorage.setItem('userName', signupData.name);
      return signupData;
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
    }
  }
);

export const userSigninFetch = createAsyncThunk(
  'signin',
  async (user: IUserLogin, { rejectWithValue }) => {
    try {
      const url = `${config.api.url}auth/signin`;
      const res = await fetch(url, {
        method: 'POST',
        headers: setHeaders(),
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        return rejectWithValue({ statusCode: res.status, message: res.statusText });
      }
      const signinData = await res.json();
      localStorage.setItem('token', signinData.token);
      localStorage.setItem('userLogin', user.login);
      return signinData;
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
    }
  }
);

export const fetchAllUsers = createAsyncThunk('users', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('token') || '';
  try {
    const res = await fetch(config.api.url + 'users', {
      method: 'GET',
      headers: setHeaders(token),
    });
    if (!res.ok) {
      return rejectWithValue({ statusCode: res.status, message: res.statusText });
    }
    const users = await res.json();
    return users;
  } catch (error) {
    return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
  }
});

export const fetchUserWithId = createAsyncThunk<string, string>('user', async (id: string) => {
  const url = `${config.api.url}users/${id}`;
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: setHeaders(token),
      body: id,
    });
    const user = await res.json();
    return user;
  } catch (error) {
    console.log(error);
  }
});

export const updateUserOnServer = createAsyncThunk(
  'update user',
  async ([id, newUserInfo]: [string, IUserUpdate], { rejectWithValue }) => {
    const url = `${config.api.url}users/${id}`;
    const token = localStorage.getItem('token') || '';
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: setHeaders(token),
        body: JSON.stringify(newUserInfo),
      });
      if (!res.ok) {
        return rejectWithValue({ statusCode: res.status, message: res.statusText });
      }
      const newUser = await res.json();
      return newUser;
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
    }
  }
);

export const deleteUserFromServer = createAsyncThunk(
  'detete user',
  async (id: string, { rejectWithValue }) => {
    const url = `${config.api.url}users/${id}`;
    const token = localStorage.getItem('token') || '';
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: setHeaders(token),
        body: id,
      });
      if (!res.ok) {
        return rejectWithValue({ statusCode: res.status, message: res.statusText });
      }
      const deletedUser = await res.json();
      return deletedUser;
    } catch (error) {
      return rejectWithValue({ statusCode: -1, message: 'Unknown error' });
    }
  }
);

export const { signInUser, updateUserLogin, signOutUser, updateUserInfo, clearUserError } =
  userSlice.actions;
export default userSlice.reducer;
