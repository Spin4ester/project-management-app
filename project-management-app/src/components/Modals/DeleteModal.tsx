import React from 'react';
import styles from './DeleteModal.module.css';
import { useTranslation } from 'react-i18next';
import { RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import { openDeleteModal } from 'redux/ModalSlice';
import { deleteUserBoard, fetchUserBoards } from 'redux/BoardSlice';

interface IProps {
  onDeleteClick: () => void;
  onCancelClick: () => void;
}

export const DeleteModal = (props: IProps) => {
  const { t } = useTranslation();

  const deleteModal = useSelector((state: RootState) => state.modal.main.deleteItemModal);
  const toBeDeleteBoard = useSelector((state: RootState) => state.board.toBeDeleteBoard);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

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
