import React from 'react';
import styles from './BoardPreviewModal.module.css';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'redux/Store';
import { openCreateTaskModal } from 'redux/ModalSlice';
import { createTask, fetchUserColumnTasks, fetchUserTasks } from 'redux/BoardSlice';

interface IFormValues {
  title: string;
  description: string;
}

export const CreateTask = (props: { columnId: string }) => {
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

  const isOpenCreateTaskModal = useSelector(
    (state: RootState) => state.modal.board.createTaskModal
  );

  const closeCreateTaskModal = () => {
    dispatch(openCreateTaskModal(false));
    reset();
  };

  const { tasks, toBeCreateTaskColumn } = useSelector((state: RootState) => state.board);

  const onSubmit = async (data: IFormValues) => {
    const columnId = toBeCreateTaskColumn;
    dispatch(fetchUserColumnTasks({ boardId, columnId }));
    const tasksCount = tasks.length;
    await dispatch(
      createTask({
        task: {
          title: data.title,
          order: tasksCount,
          description: data.description,
          userId,
          users: [],
        },
        boardId,
        columnId,
      })
    );
    // dispatch(fetchUserColumnTasks({ boardId, columnId }));
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
                <input
                  className={`${styles.title} ${styles.input}`}
                  placeholder="Title"
                  type="text"
                  {...register('title', {
                    required: { value: true, message: `${t('ThisFieldIsRequired')}` },
                    minLength: { value: 2, message: `${t('AtLeast2symbols')}` },
                    maxLength: { value: 30, message: `${t('MaxNameLength')}` },
                  })}
                ></input>
                <textarea
                  className={`${styles.description} ${styles.input}`}
                  placeholder="Description"
                  {...register('description', {
                    required: { value: true, message: `${t('ThisFieldIsRequired')}` },
                    minLength: { value: 2, message: `${t('AtLeast2symbols')}` },
                    maxLength: { value: 30, message: `${t('MaxNameLength')}` },
                  })}
                ></textarea>
                <div className={styles.buttons_container}>
                  <button className={styles.button}>{t('Create')}</button>
                  <button className={styles.button} onClick={closeCreateTaskModal}>
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
