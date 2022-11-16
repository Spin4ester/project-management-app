import React from 'react';
import styles from './SignUp.module.css';
import { useTranslation } from 'react-i18next';

export function SignUp() {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h4>{t('AccountRegistration')}</h4>
        <input className={styles.input} placeholder={t('Login') as string} type="text" />
        <input className={styles.input} placeholder={t('Password') as string} type="password" />
        <input
          className={styles.input}
          placeholder={t('ConfirmPassword') as string}
          type="password"
        />
        <button className={styles.button}>{t('SignUp')}</button>
        <div className={styles.signup}>
          <h6>{t('AlreadyAmember')}</h6>
          <button className={styles.button}>{t('SignIn')}</button>
        </div>
      </div>
    </div>
  );
}
