import React from 'react';
import styles from './SignUp.module.css';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userSignin, userSignup } from 'common/asyncActions/fetchRequests';
import { INewUser } from 'common/types';
import { useDispatch } from 'react-redux';
import { signInUser } from 'redux/UserSlice';

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
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <form
        className={styles.content}
        id="signup-form"
        onSubmit={handleSubmit(async (data) => {
          try {
            delete data.confirmPassword;
            const user = await userSignup(data as INewUser);
            if (user.statusCode === 409) {
              setError(
                'login',
                { type: 'custom', message: `${t('LoginTaken')}` },
                { shouldFocus: true }
              );
            } else {
              const userLoginData = { login: user.login, password: data.password };
              await userSignin(userLoginData);
              dispatch(signInUser());
              reset();
              navigate('/boards');
            }
          } catch (e) {
            console.log(e);
          }
        })}
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
              // validate: async (value) =>
              //   (await CheckLoginAvaliability(value)) || 'This login is already taken',
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

// async function CheckLoginAvaliability(newLogin: string) {
//   const users = (await getUsersForLoginAvaliabilityCheck()) as IUser[];
//   const logins = users.map((user) => user.login);
//   return !logins.find((login) => login === newLogin);
// }

// async function getUsersForLoginAvaliabilityCheck() {
//   const url = `${config.api.url}users`;
//   // get token from LS
//   const token =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzc3ZjAyOWVjZWUyNzQxZWZkMjU5NSIsImxvZ2luIjoiZGFzaGEiLCJpYXQiOjE2Njg3NzU4MDQsImV4cCI6MTY2ODgxOTAwNH0.3EMg_w89EN53GcLR0kdrkDyMcr9CS0seHF5WM1x5C_8';
//   try {
//     const res = await fetch(url, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const users = res.json();
//     return users;
//   } catch (error) {
//     console.log(error);
//   }
// }
