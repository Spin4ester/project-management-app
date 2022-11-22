import React from 'react';
import styles from './BoardPreviewModal.module.css';
import { useTranslation } from 'react-i18next';
import { RootState } from 'Store';
import { useSelector, useDispatch } from 'react-redux';
import { openCreateBoardModal, openEditBoardModal } from 'ModalSlice';
import { changeIsLoaded, createUserBoard, fetchUserBoards } from 'BoardSlice';
import { useForm } from 'react-hook-form';

export const BoardPreviewModal = () => {
  const createBoardModal = useSelector((state: RootState) => state.modal.createBoardModal);
  const editBoardModal = useSelector((state: RootState) => state.modal.editBoardModal);
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
      {(createBoardModal || editBoardModal) && (
        <form
          className={styles.container}
          onSubmit={handleSubmit((data) => {
            dispatch(
              createUserBoard({
                title: data.title,
                owner: localStorage.getItem('userId')!,
                users: [''],
              })
            );
            dispatch(openCreateBoardModal(false));
            dispatch(changeIsLoaded(false));
            dispatch(fetchUserBoards(localStorage.getItem('userId')!));
          })}
        >
          <div className={styles.content}>
            <h6>{createBoardModal ? t('CreateBoard') : t('EditBoard')}</h6>
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
              <button className={styles.button}>
                {createBoardModal ? t('Create') : t('Update')}
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  dispatch(openEditBoardModal(false));
                  dispatch(openCreateBoardModal(false));
                  reset();
                }}
              >
                {t('Cancel')}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
