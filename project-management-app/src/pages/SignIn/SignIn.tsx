import React from 'react';
import styles from './SignIn.module.css';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IErrorResponse, IUser, IUserLogin, IUserSigninData } from 'common/types';
import { useDispatch } from 'react-redux';
import { fetchAllUsers, signInUser, updateUserInfo, userSigninFetch } from 'redux/UserSlice';
import { AppDispatch } from 'redux/Store';
import Login from '../../assets/icons/enter.png';
import Password from '../../assets/icons/padlock.png';
// import { useGetAllUsersQuery } from 'redux/apiSlice';

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

  // const { data: users, isLoading, isSuccess, isError, error } = useGetAllUsersQuery();

  async function onSubmit(data: IUserLogin) {
    const loginData = await (await dispatch(userSigninFetch(data))).payload;
    if ((loginData as IErrorResponse).statusCode) {
      setError('login', { type: 'custom', message: `${t('AuthorizationError')}` });
      setError('password', { type: 'custom', message: `${t('AuthorizationError')}` });
    } else {
      dispatch(signInUser());
      localStorage.setItem('token', (loginData as IUserSigninData).token);
      try {
        const users = await (await dispatch(fetchAllUsers())).payload;
        const user = (users as IUser[]).find((item: IUser) => item.login === data.login);
        if (user) {
          saveUserToLocalStorage(user);
          dispatch(updateUserInfo(user));
          reset();
          navigate('/boards');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className={styles.container}>
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
  localStorage.setItem('userLogin', user.login);
}
