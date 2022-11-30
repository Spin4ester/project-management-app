import React from 'react';
import styles from './Task.module.css';
import DeleteIcon from '../../assets/icons/delete.png';
import { Draggable } from 'react-beautiful-dnd';
import { IUserTask } from 'common/types';
import { openDeleteTaskModal, openEditTaskModal } from 'redux/ModalSlice';
import { useDispatch } from 'react-redux';
import { deleteBoardTask, editBoardTask } from 'redux/SelectedBoardSlice';

type TaskComponentProps = {
  item: IUserTask;
  index: number;
};

export const Task = (props: TaskComponentProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  const deleteTask = () => {
    dispatch(deleteBoardTask({ id: props.item._id, columnId: props.item.columnId }));
    dispatch(openDeleteTaskModal(true));
  };

  const editTask = () => {
    dispatch(editBoardTask(props.item._id));
    dispatch(openEditTaskModal(true));
  };

  return (
    <Draggable key={props.item._id} draggableId={props.item._id} index={props.index}>
      {(provided) => {
        return (
          <div
            className={styles.container}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={editTask}
          >
            <p>{props.item.title}</p>
            <img
              src={DeleteIcon}
              alt="Delete task"
              onClick={deleteTask}
              className={styles.delete_img}
            />
          </div>
        );
      }}
    </Draggable>
  );
};
