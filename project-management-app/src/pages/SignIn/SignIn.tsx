import React from 'react';
import styles from './SignIn.module.css';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function SignIn() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <form
        className={styles.content}
        id="signin-form"
        onSubmit={handleSubmit((data) => onSubmit(data))}
        noValidate
      >
        <h4>{t('AccountLogin')}</h4>

        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder={t('Login') as string}
            type="text"
            autoComplete="off"
            {...register('userName', {
              required: { value: true, message: `${t('ThisFieldIsRequired')}` },
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
            })}
          />
          <p className={styles.authError} id="passwordError">
            {errors.userPassword?.message?.toString()}
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

function onSubmit(data: unknown) {
  console.log(data);
}
