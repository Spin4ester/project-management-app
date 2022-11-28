import { Task } from 'components/Task/Task';
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from './Column.module.css';
import CloseIcon from '../../assets/icons/cancel.png';

export const Column = (props) => {
  const children = props.column?.items?.map((element, index) => {
    return <Task item={element} key={element.id} index={index} onDeleteTask={props.onDeleteTask} />;
  });

  const addTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newId = 'newtask' + Math.random();
    props.onTaskAdd({ title: 'new task', id: newId }, props.droppableId);
  };

  const deleteColumn = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    const colId = e.target.parentNode.parentNode.getAttribute('id');
    props.onDeleteColumn(colId);
  };

  return (
    <div className={styles.container} id={props.droppableId}>
      <div className={styles.header}>
        <img
          src={CloseIcon}
          alt="Delete column"
          onClick={deleteColumn}
          className={styles.delete_img}
        />
        <h5>{props.column.title}</h5>
      </div>
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
