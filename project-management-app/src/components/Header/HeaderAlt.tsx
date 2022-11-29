import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from 'redux/UserSlice';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Profile from '../../assets/icons/user_alt.png';
import SignIn from '../../assets/icons/sign-in.png';
import SignUp from '../../assets/icons/sign-up.png';
import Board from '../../assets/icons/kanban_alt.png';
import SignOut from '../../assets/icons/log-out.png';

export function HeaderAlt() {
  const { t, i18n } = useTranslation();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <nav className={styles.container}>
      <Link to="/" className={styles.logo}>
        <span>T</span>ik-<span>T</span>ask
      </Link>
      <div className={styles.links_container}>
        <div className={styles.links}>
          {!isAuth && (
            <Link className={styles.link} to="/login">
              {t('SignIn')}
            </Link>
          )}
          {!isAuth && (
            <Link className={styles.link} to="/registration">
              {t('SignUp')}
            </Link>
          )}
          {isAuth && (
            <Link className={styles.link} to="/profile">
              {t('Profile')}
            </Link>
          )}
          {isAuth && (
            <Link className={styles.link} to="/boards">
              {t('Workspace')}
            </Link>
          )}
          {isAuth && (
            <p
              className={`${styles.link} ${styles.sign_out}`}
              onClick={() => {
                removeUserFromLocalStorage();
                dispatch(signOutUser());
              }}
            >
              {t('SignOut')}
            </p>
          )}
        </div>
      </div>
      <div className={styles.mobile_links_container}>
        <div className={styles.mobile_links}>
          {!isAuth && (
            <Link className={styles.mobile_link} to="/login">
              <img src={SignIn} alt="Sign In" />
            </Link>
          )}
          {!isAuth && (
            <Link className={styles.mobile_link} to="/registration">
              <img src={SignUp} alt="Sign In" />
            </Link>
          )}
          {isAuth && (
            <Link className={styles.mobile_link} to="/profile">
              <img src={Profile} alt="Profile" />
            </Link>
          )}
          {isAuth && (
            <Link className={styles.mobile_link} to="/boards">
              <img src={Board} alt="Boards" />
            </Link>
          )}
          {isAuth && (
            <img
              src={SignOut}
              alt="SignOut"
              className={`${styles.mobile_link} ${styles.mobile_sign_out}`}
              onClick={() => {
                removeUserFromLocalStorage();
                dispatch(signOutUser());
              }}
            ></img>
          )}
        </div>
      </div>
      <div className={styles.buttons_container}>
        <button
          className={
            localStorage.getItem('i18nextLng') === 'en'
              ? `${styles.button} ${styles.active}`
              : styles.button
          }
          onClick={() => i18n.changeLanguage('en')}
        >
          EN
        </button>
        <div> | </div>
        <button
          className={
            localStorage.getItem('i18nextLng') === 'ru'
              ? `${styles.button} ${styles.active}`
              : styles.button
          }
          onClick={() => i18n.changeLanguage('ru')}
        >
          RU
        </button>
      </div>
    </nav>
  );
}

export function removeUserFromLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  localStorage.removeItem('userLogin');
}
