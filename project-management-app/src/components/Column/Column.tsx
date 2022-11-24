import { Task } from 'components/Task/Task';
import React, { useState } from 'react';
import styles from './Column.module.css';

export const Column = (props) => {
  const [tasks, setTasks] = useState(['task 1', 'task 2']);

  const children = tasks.map((element, index) => {
    return <Task title={element} key={index} />;
  });

  const addTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTasks([...tasks, 'new task']);
  };

  return (
    <div className={styles.container}>
      <h5>{props.name}</h5>
      <div className={styles.content}>{children}</div>
      <div>
        <button onClick={addTask}>Add task</button>
      </div>
    </div>
  );
};
