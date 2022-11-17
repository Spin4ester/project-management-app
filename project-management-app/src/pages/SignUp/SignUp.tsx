import React from 'react';
import styles from './SignUp.module.css';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

export function SignUp() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = useForm();
  return (
    <div className={styles.container}>
      <form
        className={styles.content}
        id="signup-form"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <h4>{t('AccountRegistration')}</h4>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder={t('Login') as string}
            type="text"
            // required
            {...register('userName', { required: true })}
          />
          <p className={styles.authError} hidden={!isSubmitted && isValid}>
            This name is already taken
          </p>
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder={t('Password') as string}
            type="password"
            minLength={8}
            {...register('userPassword', { minLength: 8 })}
          />
          <p className={styles.authError}>Password should contain at least 8 symbols</p>
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder={t('ConfirmPassword') as string}
            type="password"
          />
          <p className={styles.authError}>Passwords should match</p>
        </div>
        <button className={styles.buttonSignup}>{t('SignUp')}</button>
        <div className={styles.signup}>
          <h6>{t('AlreadyAmember')}</h6>
          <button className={styles.buttonSignin}>{t('SignIn')}</button>
        </div>
      </form>
    </div>
  );
}

function onSubmit(data: unknown) {
  console.log(data);
}
