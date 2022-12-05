import React, { useEffect } from 'react';
import styles from './ErrorMessage.module.css';
import crossBtn from '../../assets/icons/cross.svg';
import { IErrorResponse } from 'common/types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/Store';
import { clearUserError, signOutUser } from 'redux/UserSlice';
import { removeUserFromLocalStorage } from 'common/utils';

interface IProps {
  error: IErrorResponse;
}

export function ErrorMessage(props: IProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  let message = props.error.message;
  makeUserFriendlyErrorName(props.error.statusCode);
  useEffect(() => {
    if (props.error.statusCode === 403) {
      setTimeout(() => {
        removeUserFromLocalStorage();
        dispatch(signOutUser());
      }, 2500);
    }
    // eslint-disable-next-line
  }, [props.error.statusCode]);

  function makeUserFriendlyErrorName(errorCode: number) {
    switch (errorCode) {
      case 403:
        message = t('AuthorizationExpired');
        break;
    }
  }

  function onCloseBtnClick() {
    dispatch(clearUserError());
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={crossBtn}
        alt="Close button"
        onClick={() => onCloseBtnClick()}
      />
      <p className={styles.stringInfo}>{t('ServerError')}</p>
      <p className={styles.stringInfo}>
        {t('Message')}: {message}
      </p>
    </div>
  );
}
