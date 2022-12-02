import React from 'react';
import styles from './AuthError.module.css';
import { useTranslation } from 'react-i18next';
import { removeUserFromLocalStorage } from 'common/utils';
import { signOutUser } from 'redux/UserSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeAuthError } from 'redux/SelectedBoardSlice';

export const AuthError = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.blur}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h6>{t('AuthorizationError')}!</h6>
          <button
            className={styles.button}
            onClick={() => {
              removeUserFromLocalStorage();
              dispatch(signOutUser());
              dispatch(removeAuthError());
              navigate(`/`);
            }}
          >
            {t('ReturnToMainPage')}
          </button>
        </div>
      </div>
    </>
  );
};
