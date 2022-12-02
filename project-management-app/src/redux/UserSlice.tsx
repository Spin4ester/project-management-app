import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import config from 'config';
import { INewUser, IUser, IUserLogin, IUserUpdate } from 'common/types';
import { setHeaders } from 'common/utils';

interface IStateUser {
  language: string;
  isAuth: boolean;
  userId: string;
  userName: string;
  userLogin: string;
}

export const initialState: IStateUser = {
  language: localStorage.getItem('i18nextLng') as string,
  isAuth: !!localStorage.getItem('token'),
  userName: localStorage.getItem('userName') || '',
  userId: localStorage.getItem('userId') || '',
  userLogin: localStorage.getItem('userLogin') || '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInUser(state) {
      state.isAuth = true;
    },
    signOutUser(state) {
      state.isAuth = false;
      state.userName = '';
      state.userId = '';
      state.userLogin = '';
    },
    updateUserInfo(state, action: PayloadAction<{ _id: string; name: string; login: string }>) {
      state.userId = action.payload._id;
      state.userName = action.payload.name;
      state.userLogin = action.payload.login;
    },
  },
});

export const userSignupFetch = createAsyncThunk<string, INewUser>(
  'signup',
  async (newUser: INewUser) => {
    const url = `${config.api.url}auth/signup`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: setHeaders(),
        body: JSON.stringify(newUser),
      });
      const signupData = await res.json();
      return signupData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

export const userSigninFetch = createAsyncThunk<string, IUserLogin>(
  'signin',
  async (user: IUserLogin) => {
    const url = `${config.api.url}auth/signin`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: setHeaders(),
        body: JSON.stringify(user),
      });
      const signinData = await res.json();
      return signinData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

export const fetchAllUsers = createAsyncThunk<IUser[]>('users', async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const res = await fetch(config.api.url + 'users', {
      method: 'GET',
      headers: setHeaders(token),
    });
    const users = await res.json();
    return users;
  } catch (error) {
    console.log(error);
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

export const updateUserOnServer = createAsyncThunk<string, [string, IUserUpdate]>(
  'update user',
  async ([id, newUserInfo]) => {
    const url = `${config.api.url}users/${id}`;
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: setHeaders(token),
        body: JSON.stringify(newUserInfo),
      });
      const newUser = await res.json();
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUserFromServer = createAsyncThunk<string, string>('detete user', async (id) => {
  const url = `${config.api.url}users/${id}`;
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: setHeaders(token),
      body: id,
    });
    const deletedUser = await res.json();
    return deletedUser;
  } catch (error) {
    console.log(error);
  }
});

export const { signInUser, signOutUser, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
