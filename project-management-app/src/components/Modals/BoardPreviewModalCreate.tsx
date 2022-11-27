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

export const BoardPreviewModalCreate = () => {
  const createBoardModal = useSelector((state: RootState) => state.modal.main.createBoardModal);
  const editBoardModal = useSelector((state: RootState) => state.modal.main.editBoardModal);
  const boardPreviewId = useSelector((state: RootState) => state.board.boardPreviewId);
  const isLoaded = useSelector((state: RootState) => state.board.isLoaded);
  const userId = useSelector((state: RootState) => state.user.userId);
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
      {createBoardModal && (
        <div
          className={styles.bg_blur}
          onClick={() => {
            dispatch(openCreateBoardModal(false));
          }}
        >
          <form
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(async (data) => {
              await dispatch(
                createUserBoard({
                  title: data.title,
                  owner: localStorage.getItem('userId')!,
                  users: [''],
                })
              );
              dispatch(openCreateBoardModal(false));
              dispatch(changeIsLoaded(false));
              dispatch(fetchUserBoards(userId));
              reset();
            })}
          >
            <div className={styles.content}>
              <h6>{t('CreateBoard')}</h6>
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
                <button className={styles.button}>{t('Create')}</button>
                <button
                  className={styles.button}
                  onClick={() => {
                    dispatch(openCreateBoardModal(false));
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
