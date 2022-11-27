import React from 'react';
import styles from './Task.module.css';
import DeleteIcon from '../../assets/icons/delete.png';
import { Draggable } from 'react-beautiful-dnd';

export const Task = (props) => {
  const deleteTask = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    const taskId = e.target.parentNode.getAttribute('data-rbd-draggable-id');
    const colId = e.target.parentNode.parentNode.getAttribute('data-rbd-droppable-id');
    props.onDeleteTask(colId, taskId);
  };

  return (
    <Draggable key={props.item.id} draggableId={props.item.id} index={props.index}>
      {(provided) => {
        return (
          <div
            className={styles.container}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
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
