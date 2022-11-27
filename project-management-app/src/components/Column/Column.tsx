import { Task } from 'components/Task/Task';
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from './Column.module.css';

export const Column = (props) => {
  const children = props.column?.items?.map((element, index) => {
    return <Task item={element} key={element.id} index={index} onDeleteTask={props.onDeleteTask} />;
  });

  const addTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newId = 'newtask' + Math.random();
    props.onTaskAdd({ title: 'new task', id: newId }, props.droppableId);
  };

  return (
    <div className={styles.container}>
      <h5>{props.column.title}</h5>
      <Droppable droppableId={props.droppableId} key={props.droppableId}>
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
        <button onClick={addTask}>Add task</button>
      </div>
    </div>
  );
};
