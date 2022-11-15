import { BoardPreview } from 'components/BoardPreview/BoardPreview';
import React from 'react';
import styles from './Main.module.css';

export function Main() {
  return (
    <main className={styles.container}>
      <BoardPreview />
      <BoardPreview />
      <BoardPreview />
      <div>Add Board</div>
    </main>
  );
}
