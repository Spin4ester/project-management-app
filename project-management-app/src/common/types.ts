export interface IUser {
  _id: string;
  name: string;
  login: string;
}

export interface INewUser {
  name: string;
  login: string;
  password: string;
  confirmPassword?: string;
}

export interface IErrorResponse {
  statusCode: string;
  message: string;
}