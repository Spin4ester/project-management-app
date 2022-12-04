import { createSlice } from '@reduxjs/toolkit';
import { IErrorResponse } from 'common/types';

const initialState: IErrorResponse = {
  show: false,
  statusCode: 0,
  message: '',
};

export const serverErrorSlice = createSlice({
  name: 'serverError',
  initialState,
  reducers: {
    updateServerErrorInfo(state, action) {
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
    },
    showError(state) {
      state.show = true;
    },
    hideError(state) {
      state.show = false;
    },
  },
});

export const { updateServerErrorInfo, showError, hideError } = serverErrorSlice.actions;
export default serverErrorSlice.reducer;
