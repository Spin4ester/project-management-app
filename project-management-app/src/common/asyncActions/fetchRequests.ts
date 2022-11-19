import { INewUser, IUserLogin } from 'common/types';
import config from '../../config';

export async function userSignup(newUser: INewUser) {
  const url = `${config.api.url}auth/signup`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const signupData = await res.json();
    return signupData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function userSignin(user: IUserLogin) {
  const url = `${config.api.url}auth/signin`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const signinData = await res.json();
    localStorage.setItem('token', signinData.token);
    return signinData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllUsers() {
  const url = `${config.api.url}users`;
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const users = await res.json();
    return users;
  } catch (error) {
    console.log(error);
  }
}
