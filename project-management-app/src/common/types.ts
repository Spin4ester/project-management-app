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

export interface IUserTask {
  _id: string;
  title: string;
  order: number;
  description: string;
  users: string[];
  boardId: string;
  columnId: string;
  userId: string;
}

export interface IUserColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface IUserTaskData {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export interface IUserColumnData {
  title: string;
  order: number;
}

export interface IUserColumnOrder {
  _id: string;
  order: number;
}
