import React from 'react';
import styles from './Task.module.css';
import DeleteIcon from '../../assets/icons/delete.png';

export const Task = (props) => {
  return (
    <div className={styles.container}>
      <p>{props.title}</p>
      <img src={DeleteIcon} alt="Delete task" />
    </div>
  );
};
