import React from 'react';
import styles from './BoardPreviewModal.module.css';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'redux/Store';
import { openCreateTaskModal } from 'redux/ModalSlice';
import { createTask, fetchUserColumnTasks, fetchUserTasks } from 'redux/BoardSlice';

export const EditTask = () => {
  const { t } = useTranslation();
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const dispatch = useDispatch<any>();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm<IFormValues>();
  // const boardId = useParams().id || '';
  // const userId = useSelector((state: RootState) => state.user.userId);

  // const isOpenCreateTaskModal = useSelector(
  //   (state: RootState) => state.modal.board.createTaskModal
  // );

  // const closeCreateTaskModal = () => {
  //   dispatch(openCreateTaskModal(false));
  //   reset();
  // };

  // const { tasks, toBeCreateTaskColumn } = useSelector((state: RootState) => state.board);

  // const onSubmit = async (data: IFormValues) => {
  //   const columnId = toBeCreateTaskColumn;
  //   dispatch(fetchUserColumnTasks({ boardId, columnId }));
  //   const tasksCount = tasks.length;
  //   await dispatch(
  //     createTask({
  //       task: {
  //         title: data.title,
  //         order: tasksCount,
  //         description: data.description,
  //         userId,
  //         users: [],
  //       },
  //       boardId,
  //       columnId,
  //     })
  //   );
  //   // dispatch(fetchUserColumnTasks({ boardId, columnId }));
  //   dispatch(fetchUserTasks(userId));
  //   closeCreateTaskModal();
  // };

  return (
    <>
      {/* {isOpenEditTaskModal && ( */}
      <div className={styles.blur}>
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <div className={styles.content}>
            <h6>{t('ViewEditTask')}</h6>
            <form className={styles.create_column_form}>
              <input
                className={`${styles.title} ${styles.input}`}
                placeholder={t('Title') || ''}
                type="text"
              ></input>
              <textarea
                className={`${styles.description} ${styles.input}`}
                placeholder={t('Description') || ''}
              ></textarea>
              <div className={styles.buttons_container}>
                <button className={styles.button}>{t('Update')}</button>
                <button className={styles.button}>{t('Cancel')}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};
