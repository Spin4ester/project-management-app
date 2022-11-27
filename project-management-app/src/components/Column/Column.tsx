import { Task } from 'components/Task/Task';
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from './Column.module.css';

export const Column = (props) => {
  // const [tasks, setTasks] = useState(props.column.items);

  const children = props.column?.items?.map((element, index) => {
    return <Task item={element} key={element.id} index={index} />;
  });

  const addTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onTaskAdd({ title: 'new task', id: 'newtask' }, props.droppableId);
  };

  return (
    <Droppable droppableId={props.droppableId} key={props.droppableId}>
      {(provided) => {
        return (
          <div className={styles.container} {...provided.droppableProps} ref={provided.innerRef}>
            <h5>{props.column.title}</h5>
            <div className={styles.content}>
              {children}
              {provided.placeholder}
            </div>
            <div>
              <button onClick={addTask}>Add task</button>
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};
