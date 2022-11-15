import { Task } from 'components/Task/Task';
import React from 'react';
import styles from './Column.module.css';

export const Column = () => {
  return (
    <div className={styles.container}>
      <h5>Column Name</h5>
      <div className={styles.content}>
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
};
