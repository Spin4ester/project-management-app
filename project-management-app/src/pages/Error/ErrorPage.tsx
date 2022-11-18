import React from 'react';
import styles from './ErrorPage.module.css';
import { useTranslation } from 'react-i18next';

export function ErrorPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.smoke}>
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </div>
      <div className={styles.text}>{t('Error404')}</div>
    </div>
  );
}
