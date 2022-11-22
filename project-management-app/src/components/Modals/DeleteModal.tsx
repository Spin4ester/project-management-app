import React from 'react';
import styles from './DeleteModal.module.css';
import { useTranslation } from 'react-i18next';
import { RootState } from 'Store';
import { useSelector, useDispatch } from 'react-redux';
import { openDeleteModal } from 'ModalSlice';

export const DeleteModal = () => {
  const { t } = useTranslation();

  const deleteModal = useSelector((state: RootState) => state.modal.deleteItemModal);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  return (
    <>
      {deleteModal && (
        <div className={styles.container}>
          <div className={styles.content}>
            <h6>{t('DeleteConfirmation')}</h6>
            <div className={styles.buttons_container}>
              <button className={styles.button}>{t('Delete')}</button>
              <button className={styles.button} onClick={() => dispatch(openDeleteModal(false))}>
                {t('Cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
