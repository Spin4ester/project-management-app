import React from 'react';
import styles from './BoardPreviewModal.module.css';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import { openCreateBoardModal } from 'redux/ModalSlice';
import { createUserBoard, fetchUserBoards } from 'redux/BoardSlice';
import { useForm } from 'react-hook-form';
import { TitleInput } from 'components/TitleInput/TitleInput';
import { IFormValues } from 'common/types';
import { ModalFormButtons } from 'components/ModalFormButtons/ModalFormButtons';

export const BoardPreviewModalCreate = () => {
  const createBoardModal = useSelector((state: RootState) => state.modal.main.createBoardModal);
  const userId = useSelector((state: RootState) => state.user.userId);
  const dispatch = useDispatch<AppDispatch>();

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormValues>();

  const onSubmit = async (data: IFormValues) => {
    await dispatch(
      createUserBoard({
        title: data.title,
        owner: localStorage.getItem('userId')!,
        users: [''],
      })
    );
    dispatch(openCreateBoardModal(false));
    dispatch(fetchUserBoards(userId));
    reset();
  };

  return (
    <>
      {createBoardModal && (
        <div
          className={styles.blur}
          onClick={() => {
            dispatch(openCreateBoardModal(false));
          }}
        >
          <form
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.content}>
              <h6>{t('CreateBoard')}</h6>
              <TitleInput register={register} errorMsg={errors.title?.message?.toString()} />
              <ModalFormButtons
                btnYes="Create"
                btnNo="Cancel"
                onClickNo={() => {
                  dispatch(openCreateBoardModal(false));
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
