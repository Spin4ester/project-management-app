import { Column } from 'components/Column/Column';
import { CreateColumn } from 'components/Modals/CreateColumn';
import { CreateTask } from 'components/Modals/CreateTask';
import { DeleteModal } from 'components/Modals/DeleteModal';
import * as React from 'react';
import { useState } from 'react';
import styles from './Board.module.css';

export const Board = () => {
  const [columns, setColumns] = useState(['first', 'second']);

  const children = columns.map((element, index) => {
    return <Column name={element} key={index} />;
  });

  const addColumn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setColumns([...columns, 'New']);
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>{children}</div>
      <div>
        <button onClick={addColumn}>Add column</button>
      </div>
      {/* <CreateColumn />
      <DeleteModal />
      <CreateTask /> */}
    </div>
  );
};
