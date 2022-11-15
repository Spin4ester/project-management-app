import { Column } from 'components/Column/Column';
import * as React from 'react';
import styles from './Board.module.css';

const Board = () => {
  return (
    <div className={styles.container}>
      <Column />
      <Column />
      <Column />
    </div>
  );
};

export default Board;
