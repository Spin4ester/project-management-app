import React from 'react';
import styles from './Task.module.css';
import DeleteIcon from '../../assets/icons/delete.png';

export const Task = () => {
  return (
    <div className={styles.container}>
      <p>Task title</p>
      <img src={DeleteIcon} alt="Delete task" />
    </div>
  );
};
