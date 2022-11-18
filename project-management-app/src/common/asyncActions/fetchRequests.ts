import { INewUser } from 'common/types';
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
    const signupData = res.json();
    return signupData;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUsers() {
  const url = `${config.api.url}users`;
  // const token = get token from LS
  let token;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const users = res.json();
    return users;
  } catch (error) {
    console.log(error);
  }
}
