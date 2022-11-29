import React from 'react';
import styles from './BoardPreviewModal.module.css';
import { useTranslation } from 'react-i18next';
import { RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import { openEditBoardModal } from 'redux/ModalSlice';
import { fetchUserBoards, updateUserBoard } from 'redux/BoardSlice';
import { useForm } from 'react-hook-form';

export const BoardPreviewModalEdit = () => {
  const editBoardModal = useSelector((state: RootState) => state.modal.main.editBoardModal);
  const boardPreviewId = useSelector((state: RootState) => state.board.boardPreviewId);
  const boardPreviewTitle = useSelector((state: RootState) => state.board.toBeEditedBoard);
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
      {editBoardModal && (
        <div
          className={styles.blur}
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
                  body: { title: data.title, owner: userId, users: [''] },
                  _id: boardPreviewId,
                })
              );
              dispatch(fetchUserBoards(userId));
              dispatch(openEditBoardModal(false));
              reset();
            })}
          >
            <div className={styles.content}>
              <h6>{t('EditBoard')}</h6>
              <input
                autoFocus
                className={`${styles.title} ${styles.input}`}
                placeholder={boardPreviewTitle}
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
                    reset();
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
