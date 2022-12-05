import React from 'react';
import styles from './AuthError.module.css';
import { useTranslation } from 'react-i18next';
import { removeUserFromLocalStorage } from 'common/utils';
import { signOutUser } from 'redux/UserSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeAuthError } from 'redux/SelectedBoardSlice';
import Warning from '../../assets/icons/warning.png';
import { openCreateTaskModal } from 'redux/ModalSlice';

export const AuthError = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.blur}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <img src={Warning} alt="Warning" />
          <h6>{t('AuthorizationError')}!</h6>
          <button
            className={styles.button}
            // onClick={() => {
            //   removeUserFromLocalStorage();
            //   dispatch(signOutUser());
            //   dispatch(removeAuthError());
            //   dispatch(openCreateTaskModal(false));
            //   navigate(`/`);
            // }}
          >
            {t('ReturnToMainPage')}
          </button>
        </div>
      </div>
    </>
  );
};
