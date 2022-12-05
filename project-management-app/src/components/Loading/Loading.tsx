import React from 'react';
import styles from './Loading.module.css';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';

export const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Spinner animation="border" />
      <p>{t('Loading')}...</p>
    </div>
  );
};
