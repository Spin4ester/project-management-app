import React from 'react';
import styles from './Task.module.css';
import DeleteIcon from '../../assets/icons/delete.png';
import { Draggable } from 'react-beautiful-dnd';

type TaskProps = {
  id: string;
  title: string;
};

type TaskComponentProps = {
  item: TaskProps;
  index: number;
  onDeleteTask: (colId: string, taskId: string) => void;
};

export const Task = (props: TaskComponentProps) => {
  const deleteTask = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target) {
      const taskId = (target.parentNode as HTMLElement).getAttribute('data-rbd-draggable-id');
      const colId = (target.parentNode?.parentNode as HTMLElement).getAttribute(
        'data-rbd-droppable-id'
      );
      if (colId && taskId) props.onDeleteTask(colId, taskId);
    }
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
