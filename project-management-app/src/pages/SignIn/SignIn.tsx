import React, { useEffect } from 'react';
import styles from './SignIn.module.css';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IUser, IUserLogin } from 'common/types';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllUsers,
  signInUser,
  updateUserInfo,
  updateUserLogin,
  userSigninFetch,
} from 'redux/UserSlice';
import { AppDispatch, RootState } from 'redux/Store';
import Login from '../../assets/icons/enter.png';
import Password from '../../assets/icons/padlock.png';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';

export function SignIn() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const error = useSelector((state: RootState) => state.user.serverError);

  useEffect(() => {
    if (error.statusCode === 401) {
      setError('login', { type: 'custom', message: `${t('AuthorizationError')}` });
      setError('password', { type: 'custom', message: `${t('AuthorizationError')}` });
    }
    // eslint-disable-next-line
  }, [error.statusCode]);

  async function onSubmit(data: IUserLogin) {
    await dispatch(userSigninFetch(data));
    const token = localStorage.getItem('token');
    const login = localStorage.getItem('userLogin');
    if (token) {
      dispatch(updateUserLogin(data.login));
      const users = await (await dispatch(fetchAllUsers())).payload;
      const user = users.find((item: IUser) => item.login === login);
      if (user) {
        dispatch(updateUserInfo(user));
        saveUserToLocalStorage(user);
        dispatch(signInUser());
        reset();
      }
    }
  }

  return (
    <div className={styles.container}>
      {!!error.statusCode && error.statusCode !== 401 && <ErrorMessage error={error} />}
      <form
        className={styles.content}
        id="signin-form"
        onSubmit={handleSubmit((data) => onSubmit(data as IUserLogin))}
        noValidate
      >
        <h4>{t('AccountLogin')}</h4>

        <div className={styles.inputContainer}>
          <div className={styles.input_description}>
            <img src={Login}></img>
            <p>{t('Login')}</p>
          </div>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            {...register('login', {
              required: { value: true, message: `${t('ThisFieldIsRequired')}` },
            })}
          />
          <p className={styles.authError} id="userNameError">
            {errors.login?.message?.toString()}
          </p>
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.input_description}>
            <img src={Password}></img>
            <p>{t('Password')}</p>
          </div>
          <input
            className={styles.input}
            type="password"
            autoComplete="off"
            {...register('password', {
              required: { value: true, message: `${t('ThisFieldIsRequired')}` },
            })}
          />
          <p className={styles.authError} id="passwordError">
            {errors.password?.message?.toString()}
          </p>
        </div>
        <button className={styles.buttonSignin}>{t('SignIn')}</button>
      </form>
      <div className={styles.signup}>
        <h6>{t('DoNotHaveAccount')}</h6>
        <button className={styles.buttonSignup} onClick={() => navigate('/registration')}>
          {t('SignUp')}
        </button>
      </div>
    </div>
  );
}

export function saveUserToLocalStorage(user: IUser) {
  localStorage.setItem('userId', user._id);
  localStorage.setItem('userName', user.name);
}
