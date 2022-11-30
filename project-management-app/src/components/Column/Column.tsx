import { Task } from 'components/Task/Task';
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from './Column.module.css';
import CloseIcon from '../../assets/icons/cancel.png';
import { openCreateTaskModal, openDeleteColumnModal } from 'redux/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CreateButton } from 'components/CreateButton/CreateButton';
import { ColumnTitleForm } from 'components/ColumnTitleForm/ColumnTitleForm';
import { IUserColumn } from 'common/types';
import {
  createColumnTask,
  deleteBoardColumn,
  fetchUserColumnTasks,
} from 'redux/SelectedBoardSlice';
import { RootState } from 'redux/Store';

type ColumnComponentProps = {
  column: IUserColumn;
  droppableId: string;
};

export const Column = (props: ColumnComponentProps) => {
  const [isTitleEditable, setTitleEditable] = useState(false);
  const { tasks } = useSelector((state: RootState) => state.selectedBoard);

  const children = tasks
    .filter((task) => task.columnId === props.column._id)
    .sort((task1, task2) => task1.order - task2.order)
    .map((element, index) => {
      return <Task item={element} key={element._id} index={index} />;
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  const addTask = async () => {
    dispatch(createColumnTask(props.column._id));
    dispatch(fetchUserColumnTasks({ boardId: props.column.boardId, columnId: props.column._id }));
    dispatch(openCreateTaskModal(true));
  };

  const deleteColumn = () => {
    dispatch(deleteBoardColumn(props.column._id));
    dispatch(openDeleteColumnModal(true));
  };

  const showEditTitleForm = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target) setTitleEditable(true);
  };

  return (
    <div className={styles.container} id={props.droppableId}>
      <div className={styles.header}>
        {!isTitleEditable && (
          <>
            <img
              src={CloseIcon}
              alt="Delete column"
              onClick={deleteColumn}
              className={styles.delete_img}
            />
            <h5 className={styles.title} onClick={showEditTitleForm}>
              {props.column.title}
            </h5>
          </>
        )}
        {isTitleEditable && (
          <ColumnTitleForm column={props.column} setTitleEditable={setTitleEditable} />
        )}
      </div>
      <Droppable droppableId={props.droppableId} key={props.droppableId} type="task">
        {(provided) => {
          return (
            <div className={styles.content} {...provided.droppableProps} ref={provided.innerRef}>
              {children}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      <div>
        <CreateButton title="CreateTask" onClickFunc={addTask} type="narrow" />
      </div>
    </div>
  );
};
