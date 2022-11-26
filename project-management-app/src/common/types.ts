export interface IUser {
  _id: string;
  name: string;
  login: string;
}

export interface IUserLogin {
  login: string;
  password: string;
}

export interface INewUser {
  name: string;
  login: string;
  password: string;
  confirmPassword?: string;
}

export interface IUserUpdate {
  name: string;
  login: string;
  password: string;
}

export interface IUserSigninData {
  token: string;
}

export interface IErrorResponse {
  statusCode: number;
  message: string;
}

export interface IUserBoard {
  owner: string;
  title: string;
  users: string[];
  _id: string;
}

export interface IUserBoardData {
  owner: string;
  title: string;
  users: string[];
}

export interface IUserBoardDataUpdate {
  body: {
    owner: string;
    title: string;
    users: string[];
  };
  _id: string;
}
