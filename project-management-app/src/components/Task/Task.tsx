import React from 'react';
import styles from './Task.module.css';
import DeleteIcon from '../../assets/icons/delete.png';
import { Draggable } from 'react-beautiful-dnd';

export const Task = (props) => {
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
            <img src={DeleteIcon} alt="Delete task" />
          </div>
        );
      }}
    </Draggable>
  );
};
