import React from 'react';
import styles from './BoardPreviewModal.module.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { openCreateColumnModal } from 'redux/ModalSlice';
import { RootState } from 'redux/Store';
import { useForm } from 'react-hook-form';
import { createColumn, fetchUserColumns } from 'redux/BoardSlice';
import { useParams } from 'react-router';

interface IFormValues {
  title: string;
}

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
  const userId = useSelector((state: RootState) => state.user.userId);

  const isOpenCreateColumnModal = useSelector(
    (state: RootState) => state.modal.board.createColumnModal
  );

  const closeCreateColumnModal = () => {
    dispatch(openCreateColumnModal(false));
    reset();
  };

  const { columns } = useSelector((state: RootState) => state.board);

  const onSubmit = async (data: IFormValues) => {
    dispatch(fetchUserColumns(userId));
    const columsCount = columns.length;
    await dispatch(
      createColumn({
        column: {
          title: data.title,
          order: columsCount,
        },
        boardId,
      })
    );
    dispatch(fetchUserColumns(userId));
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
                <input
                  className={`${styles.title} ${styles.input}`}
                  placeholder={t('Title') || ''}
                  type="text"
                  {...register('title', {
                    required: { value: true, message: `${t('ThisFieldIsRequired')}` },
                    minLength: { value: 2, message: `${t('AtLeast2symbols')}` },
                    maxLength: { value: 30, message: `${t('MaxNameLength')}` },
                  })}
                ></input>
                <p className={styles.authError} id="columnNameError">
                  {errors.title?.message?.toString()}
                </p>
                <div className={styles.buttons_container}>
                  <button className={styles.button}>{t('Create')}</button>
                  <button className={styles.button} onClick={closeCreateColumnModal}>
                    {t('Cancel')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
