import React from 'react';
import styles from './DeleteModal.module.css';
import { useTranslation } from 'react-i18next';

export const DeleteModal = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h6>{t('DeleteConfirmation')}</h6>
        <div className={styles.buttons_container}>
          <button className={styles.button}>{t('Delete')}</button>
          <button className={styles.button}>{t('Cancel')}</button>
        </div>
      </div>
    </div>
  );
};
