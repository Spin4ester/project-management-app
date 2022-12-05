import React from 'react';
import styles from './BoardPreviewModal.module.css';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from 'redux/Store';
import { openCreateTaskModal } from 'redux/ModalSlice';
import { createTask, fetchUserTasks } from 'redux/SelectedBoardSlice';
import { TitleInput } from 'components/TitleInput/TitleInput';
import { IFormValues } from 'common/types';
import { DescriptionTextarea } from 'components/DescriptionTextarea/DescriptionTextarea';
import { ModalFormButtons } from 'components/ModalFormButtons/ModalFormButtons';

export const CreateTask = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormValues>();
  const boardId = useParams().id || '';
  const userId = useSelector((state: RootState) => state.user.userId);

  const isOpenCreateTaskModal = useSelector(
    (state: RootState) => state.modal.board.createTaskModal
  );

  const closeCreateTaskModal = () => {
    dispatch(openCreateTaskModal(false));
    reset();
  };

  const { toBeCreateTaskColumn, toBeAddTaskColumn } = useSelector(
    (state: RootState) => state.selectedBoard
  );

  const onSubmit = async (data: IFormValues) => {
    const columnId = toBeCreateTaskColumn;
    await dispatch(fetchUserTasks(userId));
    const nextOrder = toBeAddTaskColumn.length > 0 ? toBeAddTaskColumn[0].order + 1 : 0;
    await dispatch(
      createTask({
        task: {
          title: data.title,
          order: nextOrder,
          description: data.description || '',
          userId,
          users: [],
        },
        boardId,
        columnId,
      })
    );
    dispatch(fetchUserTasks(userId));
    closeCreateTaskModal();
  };

  return (
    <>
      {isOpenCreateTaskModal && (
        <div className={styles.blur} onClick={closeCreateTaskModal}>
          <div className={styles.container} onClick={(e) => e.stopPropagation()}>
            <div className={styles.content}>
              <h6>{t('CreateTask')}</h6>
              <form className={styles.create_column_form} onSubmit={handleSubmit(onSubmit)}>
                <TitleInput register={register} errorMsg={errors.title?.message?.toString()} />
                <DescriptionTextarea
                  register={register}
                  errorMsg={errors.description?.message?.toString()}
                />
                <ModalFormButtons btnYes="Create" btnNo="Cancel" onClickNo={closeCreateTaskModal} />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
