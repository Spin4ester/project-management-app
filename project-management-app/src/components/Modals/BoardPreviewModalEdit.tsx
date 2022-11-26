import React from 'react';
import styles from './BoardPreviewModal.module.css';
import { useTranslation } from 'react-i18next';
import { RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import { openCreateBoardModal, openEditBoardModal } from 'redux/ModalSlice';
import {
  changeIsLoaded,
  createUserBoard,
  fetchUserBoards,
  updateUserBoard,
} from 'redux/BoardSlice';
import { useForm } from 'react-hook-form';

export const BoardPreviewModalEdit = () => {
  const createBoardModal = useSelector((state: RootState) => state.modal.main.createBoardModal);
  const editBoardModal = useSelector((state: RootState) => state.modal.main.editBoardModal);
  const boardPreviewId = useSelector((state: RootState) => state.board.boardPreviewId);
  const isLoaded = useSelector((state: RootState) => state.board.isLoaded);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  return (
    <>
      {editBoardModal && (
        <div
          className={styles.bg_wrapper}
          onClick={() => {
            dispatch(openEditBoardModal(false));
          }}
        >
          <form
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(async (data) => {
              // dispatch(changeBoardUpdated(false));
              await dispatch(
                updateUserBoard({
                  body: { title: data.title, owner: localStorage.getItem('userId')!, users: [''] },
                  _id: boardPreviewId,
                })
              );
              dispatch(fetchUserBoards(localStorage.getItem('userId')!));
              dispatch(openEditBoardModal(false));
              reset();
            })}
          >
            <div className={styles.content}>
              <h6>{t('EditBoard')}</h6>
              <input
                className={`${styles.title} ${styles.input}`}
                placeholder="Title"
                type="text"
                autoComplete="off"
                {...register('title', {
                  required: { value: true, message: `${t('ThisFieldIsRequired')}` },
                  minLength: { value: 2, message: `${t('AtLeast2symbols')}` },
                  maxLength: { value: 30, message: `${t('MaxNameLength')}` },
                })}
              ></input>
              <p className={styles.authError} id="boardNameError">
                {errors.title?.message?.toString()}
              </p>
              {/* <textarea
              className={`${styles.description} ${styles.input}`}
              placeholder="Description"
            ></textarea> */}
              <div className={styles.buttons_container}>
                <button className={styles.button}>{t('Update')}</button>
                <button
                  className={styles.button}
                  onClick={() => {
                    dispatch(openEditBoardModal(false));
                  }}
                >
                  {t('Cancel')}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
