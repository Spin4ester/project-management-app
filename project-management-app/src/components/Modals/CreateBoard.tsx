import React from 'react';
import styles from './CreateModal.module.css';
import { useTranslation } from 'react-i18next';

export const CreateBoard = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h6>{t('CreateBoard')}</h6>
        <input
          className={`${styles.title} ${styles.input}`}
          placeholder="Title"
          type="text"
        ></input>
        <textarea
          className={`${styles.description} ${styles.input}`}
          placeholder="Description"
        ></textarea>
        <div className={styles.buttons_container}>
          <button className={styles.button}>{t('Create')}</button>
          <button className={styles.button}>{t('Cancel')}</button>
        </div>
      </div>
    </div>
  );
};
