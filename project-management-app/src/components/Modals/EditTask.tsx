import React from 'react';
import styles from './BoardPreviewModal.module.css';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/Store';
import { openEditTaskModal } from 'redux/ModalSlice';
import { fetchUserTasks, updateTask } from 'redux/SelectedBoardSlice';
import { TitleInput } from 'components/TitleInput/TitleInput';
import { IFormValues } from 'common/types';
import { DescriptionTextarea } from 'components/DescriptionTextarea/DescriptionTextarea';
import { ModalFormButtons } from 'components/ModalFormButtons/ModalFormButtons';

export const EditTask = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormValues>();

  const isOpenEditTaskModal = useSelector((state: RootState) => state.modal.board.editTaskModal);

  const closeEditTaskModal = () => {
    dispatch(openEditTaskModal(false));
    reset();
  };

  const { tasks, toBeEditTask } = useSelector((state: RootState) => state.selectedBoard);
  const taskId = toBeEditTask;
  const task = tasks.find((el) => el._id === taskId);

  const onSubmit = async (data: IFormValues) => {
    if (task) {
      await dispatch(
        updateTask({
          boardId: task.boardId,
          columnId: task.columnId,
          taskId: task._id,
          task: {
            title: data.title,
            order: task.order,
            description: data.description || '',
            columnId: task.columnId,
            userId: task.userId,
            users: task.users,
          },
        })
      );
      dispatch(fetchUserTasks(task.userId));
    }
    closeEditTaskModal();
  };

  return (
    <>
      {isOpenEditTaskModal && (
        <div className={styles.blur} onClick={closeEditTaskModal}>
          <div className={styles.container} onClick={(e) => e.stopPropagation()}>
            <div className={styles.content}>
              <h6>{t('ViewEditTask')}</h6>
              <form className={styles.create_column_form} onSubmit={handleSubmit(onSubmit)}>
                <TitleInput
                  register={register}
                  errorMsg={errors.title?.message?.toString()}
                  title={task?.title}
                />
                <DescriptionTextarea
                  register={register}
                  errorMsg={errors.description?.message?.toString()}
                  description={task?.description}
                />
                <ModalFormButtons btnYes="Update" btnNo="Cancel" onClickNo={closeEditTaskModal} />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
