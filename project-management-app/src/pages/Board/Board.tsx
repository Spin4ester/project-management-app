import { Column } from 'components/Column/Column';
import * as React from 'react';
import styles from './Board.module.css';

export const Board = () => {
  return (
    <div className={styles.container}>
      <Column />
      <Column />
      <Column />
    </div>
  );
};
