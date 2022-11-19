import { Column } from 'components/Column/Column';
import { CreateColumn } from 'components/Modals/CreateColumn';
import { CreateTask } from 'components/Modals/CreateTask';
import { DeleteModal } from 'components/Modals/DeleteModal';
import * as React from 'react';
import styles from './Board.module.css';

export const Board = () => {
  return (
    <div className={styles.container}>
      <Column />
      <Column />
      <Column />
      <CreateColumn />
      <DeleteModal />
      <CreateTask />
    </div>
  );
};
