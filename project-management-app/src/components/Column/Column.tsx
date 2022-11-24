import { Task } from 'components/Task/Task';
import React from 'react';
import styles from './Column.module.css';

export const Column = (props) => {
  return (
    <div className={styles.container}>
      <h5>{props.name}</h5>
      <div className={styles.content}>
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
};
