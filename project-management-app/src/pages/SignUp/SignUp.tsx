import React from 'react';
import styles from './SignUp.module.css';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IErrorResponse, INewUser, IUser, IUserSigninData } from 'common/types';
import { useDispatch } from 'react-redux';
import { signInUser, updateUserInfo, userSigninFetch, userSignupFetch } from 'redux/UserSlice';
import { AppDispatch } from 'redux/Store';
import { saveUserToLocalStorage } from 'pages/SignIn/SignIn';

export function SignUp() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  async function onSubmit(data: INewUser) {
    try {
      delete data.confirmPassword;
      const user = await (await dispatch(userSignupFetch(data))).payload;
      if ((user as IErrorResponse).statusCode === 409) {
        setError('login', { type: 'custom', message: `${t('LoginTaken')}` }, { shouldFocus: true });
      } else {
        const userLoginData = { login: (user as IUser).login, password: data.password };
        const loginData = await (await dispatch(userSigninFetch(userLoginData))).payload;
        dispatch(signInUser());
        dispatch(updateUserInfo(user as IUser));
        localStorage.setItem('token', (loginData as IUserSigninData).token);
        saveUserToLocalStorage(user as IUser);
        reset();
        navigate('/boards');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.content}
        id="signup-form"
        onSubmit={handleSubmit(async (data) => onSubmit(data as INewUser))}
        noValidate
      >
        <h4>{t('AccountRegistration')}</h4>

        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder={t('UserName') as string}
            type="text"
            autoComplete="off"
            {...register('name', {
              required: { value: true, message: `${t('ThisFieldIsRequired')}` },
              maxLength: { value: 30, message: `${t('MaxNameLength')}` },
            })}
          />
          <p className={styles.authError} id="userNameError">
            {errors.name?.message?.toString()}
          </p>
        </div>

        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder={t('Login') as string}
            type="text"
            autoComplete="off"
            {...register('login', {
              required: { value: true, message: `${t('ThisFieldIsRequired')}` },
              minLength: { value: 2, message: `${t('AtLeast2symbols')}` },
              maxLength: { value: 30, message: `${t('MaxNameLength')}` },
            })}
          />
          <p className={styles.authError} id="userLoginError">
            {errors.login?.message?.toString()}
          </p>
        </div>

        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder={t('Password') as string}
            type="password"
            autoComplete="off"
            {...register('password', {
              required: { value: true, message: `${t('ThisFieldIsRequired')}` },
              minLength: { value: 8, message: `${t('AtLeast8symbols')}` },
            })}
          />
          <p className={styles.authError} id="passwordError">
            {errors.password?.message?.toString()}
          </p>
        </div>

        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder={t('ConfirmPassword') as string}
            type="password"
            autoComplete="off"
            {...register('confirmPassword', {
              required: { value: true, message: `${t('ThisFieldIsRequired')}` },
              validate: (value) => value === getValues('password') || `${t('PasswordsDoNotMatch')}`,
            })}
          />
          <p className={styles.authError} id="confirmPasswordError">
            {errors.confirmPassword?.message?.toString()}
          </p>
        </div>

        <button className={styles.buttonSignup}>{t('SignUp')}</button>
      </form>
      <div className={styles.signup}>
        <h6>{t('AlreadyAmember')}</h6>
        <button className={styles.buttonSignin} onClick={() => navigate('/login')}>
          {t('SignIn')}
        </button>
      </div>
    </div>
  );
}
