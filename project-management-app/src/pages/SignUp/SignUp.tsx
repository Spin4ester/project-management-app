import React, { useEffect } from 'react';
import styles from './SignUp.module.css';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { INewUser } from 'common/types';
import { useSelector, useDispatch } from 'react-redux';
import { userSigninFetch, userSignupFetch } from 'redux/UserSlice';
import { AppDispatch, RootState } from 'redux/Store';
import Login from '../../assets/icons/enter.png';
import Password from '../../assets/icons/padlock.png';
import User from '../../assets/icons/account.png';
import ConfirmPassword from '../../assets/icons/padlock_confirm.png';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';

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

  const error = useSelector((state: RootState) => state.user.serverError);

  useEffect(() => {
    if (error.statusCode === 409) {
      setError('login', { type: 'custom', message: `${t('LoginTaken')}` }, { shouldFocus: true });
    }
    // eslint-disable-next-line
  }, [error.statusCode]);

  async function onSubmit(data: INewUser) {
    delete data.confirmPassword;
    await dispatch(userSignupFetch(data));

    const userLoginData = { login: data.login, password: data.password };
    await dispatch(userSigninFetch(userLoginData));

    reset();
    navigate('/boards');
  }

  return (
    <div className={styles.container}>
      {!!error.statusCode && error.statusCode !== 409 && <ErrorMessage error={error} />}
      <form
        className={styles.content}
        id="signup-form"
        onSubmit={handleSubmit(async (data) => onSubmit(data as INewUser))}
        noValidate
      >
        <h4>{t('AccountRegistration')}</h4>

        <div className={styles.inputContainer}>
          <div className={styles.input_description}>
            <img src={User}></img>
            <p>{t('UserName')}</p>
          </div>
          <input
            className={styles.input}
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
              minLength: { value: 2, message: `${t('AtLeast2symbols')}` },
              maxLength: { value: 30, message: `${t('MaxNameLength')}` },
            })}
          />
          <p className={styles.authError} id="userLoginError">
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
              minLength: { value: 8, message: `${t('AtLeast8symbols')}` },
            })}
          />
          <p className={styles.authError} id="passwordError">
            {errors.password?.message?.toString()}
          </p>
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.input_description}>
            <img src={ConfirmPassword}></img>
            <p>{t('ConfirmPassword')}</p>
          </div>
          <input
            className={styles.input}
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
