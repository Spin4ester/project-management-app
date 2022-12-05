import React from 'react';
import styles from './BoardPreviewModal.module.css';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import { openEditBoardModal } from 'redux/ModalSlice';
import { fetchUserBoards, updateUserBoard } from 'redux/BoardSlice';
import { useForm } from 'react-hook-form';
import { IFormValues } from 'common/types';
import { TitleInput } from 'components/TitleInput/TitleInput';
import { ModalFormButtons } from 'components/ModalFormButtons/ModalFormButtons';

export const BoardPreviewModalEdit = () => {
  const editBoardModal = useSelector((state: RootState) => state.modal.main.editBoardModal);
  const boardPreviewId = useSelector((state: RootState) => state.board.boardPreviewId);
  const boardPreviewTitle = useSelector((state: RootState) => state.board.toBeEditedBoard);
  const userId = useSelector((state: RootState) => state.user.userId);
  const dispatch = useDispatch<AppDispatch>();

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<IFormValues>();

  const onSubmit = async (data: IFormValues) => {
    await dispatch(
      updateUserBoard({
        body: { title: data.title, owner: userId, users: [''] },
        _id: boardPreviewId,
      })
    );
    dispatch(openEditBoardModal(false));
    dispatch(fetchUserBoards(userId));
    reset();
  };

  return (
    <>
      {editBoardModal && (
        <div
          className={styles.blur}
          onClick={() => {
            dispatch(openEditBoardModal(false));
            reset();
          }}
        >
          <form
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.content}>
              <h6>{t('EditBoard')}</h6>
              <TitleInput
                register={register}
                errorMsg={errors.title?.message?.toString()}
                title={boardPreviewTitle}
              />
              <ModalFormButtons
                btnYes="Update"
                btnNo="Cancel"
                onClickNo={() => {
                  dispatch(openEditBoardModal(false));
                  reset();
                }}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};
