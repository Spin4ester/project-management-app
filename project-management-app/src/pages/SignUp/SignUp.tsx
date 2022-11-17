import React from 'react';
import styles from './SignUp.module.css';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <form
        className={styles.content}
        id="signup-form"
        onSubmit={handleSubmit((data) => onSubmit(data))}
        noValidate
      >
        <h4>{t('AccountRegistration')}</h4>

        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder={t('Login') as string}
            type="text"
            autoComplete="off"
            {...register('userName', {
              required: { value: true, message: `${t('ThisFieldIsRequired')}` },
              minLength: { value: 2, message: `${t('AtLeast2symbols')}` },
            })}
          />
          <p className={styles.authError} id="userNameError">
            {errors.userName?.message?.toString()}
          </p>
        </div>

        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder={t('Password') as string}
            type="password"
            autoComplete="off"
            {...register('userPassword', {
              required: { value: true, message: `${t('ThisFieldIsRequired')}` },
              minLength: { value: 8, message: `${t('AtLeast8symbols')}` },
            })}
          />
          <p className={styles.authError} id="passwordError">
            {errors.userPassword?.message?.toString()}
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
              validate: (value) =>
                value === getValues('userPassword') || `${t('PasswordsDoNotMatch')}`,
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

function onSubmit(data: unknown) {
  console.log(data);
}
