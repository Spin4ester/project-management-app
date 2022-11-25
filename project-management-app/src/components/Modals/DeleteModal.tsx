import React from 'react';
import styles from './DeleteModal.module.css';
import { useTranslation } from 'react-i18next';

interface IProps {
  onDeleteClick: () => void;
  onCancelClick: () => void;
}

export const DeleteModal = (props: IProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.blur} onClick={props.onCancelClick}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h6>{t('DeleteConfirmation') + ' ' + t('Profile').toLocaleLowerCase() + '?'}</h6>
          <div className={styles.buttons_container}>
            <button className={styles.button} onClick={props.onDeleteClick}>
              {t('Delete')}
            </button>
            <button className={styles.button} onClick={props.onCancelClick}>
              {t('Cancel')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
