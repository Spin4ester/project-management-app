import React from 'react';
import styles from './DeleteModal.module.css';
import { useTranslation } from 'react-i18next';
import { RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import { openDeleteModal } from 'redux/ModalSlice';
import { deleteUserBoard, fetchUserBoards } from 'redux/BoardSlice';

export const DeleteModal = () => {
  const { t } = useTranslation();

  const deleteModal = useSelector((state: RootState) => state.modal.deleteItemModal);
  const toBeDeleteBoard = useSelector((state: RootState) => state.board.toBeDeleteBoard);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  return (
    <>
      {deleteModal && (
        <div className={styles.container}>
          <div className={styles.content}>
            <h6>{t('DeleteConfirmation')}</h6>
            <div className={styles.buttons_container}>
              <button
                className={styles.button}
                onClick={async () => {
                  await dispatch(deleteUserBoard(toBeDeleteBoard));
                  dispatch(fetchUserBoards(localStorage.getItem('userId')!));
                  dispatch(openDeleteModal(false));
                }}
              >
                {t('Delete')}
              </button>
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
