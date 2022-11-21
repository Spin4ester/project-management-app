import React from 'react';
import styles from './BoardPreviewModal.module.css';
import { useTranslation } from 'react-i18next';
import { RootState } from 'Store';
import { useSelector, useDispatch } from 'react-redux';
import { openCreateBoardModal, openEditBoardModal } from 'ModalSlice';

export const BoardPreviewModal = () => {
  const createBoardModal = useSelector((state: RootState) => state.modal.createBoardModal);
  const editBoardModal = useSelector((state: RootState) => state.modal.editBoardModal);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  return (
    <>
      {(createBoardModal || editBoardModal) && (
        <div className={styles.container}>
          <div className={styles.content}>
            <h6>{createBoardModal ? t('CreateBoard') : t('EditBoard')}</h6>
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
              <button
                className={styles.button}
                onClick={() =>
                  dispatch(openEditBoardModal(false)) && dispatch(openCreateBoardModal(false))
                }
              >
                {t('Cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
