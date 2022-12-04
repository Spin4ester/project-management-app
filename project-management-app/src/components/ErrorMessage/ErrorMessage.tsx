import React from 'react';
import styles from './ErrorMessage.module.css';
import crossBtn from '../../assets/icons/cross.svg';
import { IErrorResponse } from 'common/types';
import { useDispatch } from 'react-redux';
import { hideError } from 'redux/ServerErorsSlice';
import { signOutUser } from 'redux/UserSlice';
import { removeUserFromLocalStorage } from 'common/utils';

interface IProps {
  error: IErrorResponse;
}

export function ErrorMessage(props: IProps) {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={crossBtn}
        alt="Close button"
        onClick={() => {
          if (props.error.statusCode === 403) {
            dispatch(signOutUser());
            removeUserFromLocalStorage();
          }
          dispatch(hideError());
        }}
      />
      <p className={styles.stringInfo}>Server error occured</p>
      <p className={styles.stringInfo}>Code: {props.error.statusCode}</p>
      <p className={styles.stringInfo}>Message: {props.error.message}</p>
    </div>
  );
}
