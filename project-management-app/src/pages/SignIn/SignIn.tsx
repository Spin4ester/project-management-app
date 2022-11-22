import React from 'react';
import styles from './SignIn.module.css';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userSignin } from 'common/asyncActions/fetchRequests';
import { IUserLogin } from 'common/types';
import { useDispatch } from 'react-redux';
import { signInUser } from 'redux/UserSlice';

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
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <form
        className={styles.content}
        id="signin-form"
        onSubmit={handleSubmit(async (data) => {
          const loginData = await userSignin(data as IUserLogin);
          if (loginData.statusCode) {
            setError('login', { type: 'custom', message: `${t('AuthorizationError')}` });
            setError('password', { type: 'custom', message: `${t('AuthorizationError')}` });
          } else {
            dispatch(signInUser());
            reset();
            navigate('/boards');
          }
        })}
        noValidate
      >
        <h4>{t('AccountLogin')}</h4>

        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder={t('Login') as string}
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
          <input
            className={styles.input}
            placeholder={t('Password') as string}
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
