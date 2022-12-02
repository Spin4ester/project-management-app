import React from 'react';
import styles from './BoardPreviewModal.module.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { openCreateColumnModal } from 'redux/ModalSlice';
import { RootState } from 'redux/Store';
import { useForm } from 'react-hook-form';
import { createColumn, fetchBoardColumns } from 'redux/SelectedBoardSlice';
import { useParams } from 'react-router';
import { TitleInput } from 'components/TitleInput/TitleInput';
import { IFormValues } from 'common/types';
import { ModalFormButtons } from 'components/ModalFormButtons/ModalFormButtons';

export const CreateColumn = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormValues>();
  const boardId = useParams().id || '';

  const isOpenCreateColumnModal = useSelector(
    (state: RootState) => state.modal.board.createColumnModal
  );

  const closeCreateColumnModal = () => {
    dispatch(openCreateColumnModal(false));
    reset();
  };

  const { columns } = useSelector((state: RootState) => state.selectedBoard);

  const onSubmit = async (data: IFormValues) => {
    await dispatch(fetchBoardColumns(boardId));
    const nextOrder = columns[columns.length - 1].order + 1;
    await dispatch(
      createColumn({
        column: {
          title: data.title,
          order: nextOrder,
        },
        boardId,
      })
    );
    dispatch(fetchBoardColumns(boardId));
    closeCreateColumnModal();
  };

  return (
    <>
      {isOpenCreateColumnModal && (
        <div className={styles.blur} onClick={closeCreateColumnModal}>
          <div className={styles.container} onClick={(e) => e.stopPropagation()}>
            <div className={styles.content}>
              <h6>{t('CreateColumn')}</h6>
              <form className={styles.create_column_form} onSubmit={handleSubmit(onSubmit)}>
                <TitleInput register={register} errorMsg={errors.title?.message?.toString()} />
                <ModalFormButtons
                  btnYes="Create"
                  btnNo="Cancel"
                  onClickNo={closeCreateColumnModal}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
