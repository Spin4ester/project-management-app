import React from 'react';
import styles from './CreateModal.module.css';
import { useTranslation } from 'react-i18next';

export const CreateColumn = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h6>{t('CreateColumn')}</h6>
        <input
          className={`${styles.title} ${styles.input}`}
          placeholder="Title"
          type="text"
        ></input>
        <div className={styles.buttons_container}>
          <button className={styles.button}>{t('Create')}</button>
          <button className={styles.button}>{t('Cancel')}</button>
        </div>
      </div>
    </div>
  );
};
