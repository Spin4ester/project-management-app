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

export interface IUserSigninData {
  token: string;
}

export interface IErrorResponse {
  statusCode: string;
  message: string;
}
