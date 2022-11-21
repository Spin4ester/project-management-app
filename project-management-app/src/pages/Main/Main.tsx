import { BoardPreview } from 'components/BoardPreview/BoardPreview';
import { CreateBoard } from 'components/Modals/CreateBoard';
import { RootState } from 'Store';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import styles from './Main.module.css';
import { fetchUserBoards } from 'BoardSlice';

export function Main() {
  const isLoaded = useSelector((state: RootState) => state.board.isLoaded);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchUserBoards(localStorage.getItem('userId')!));
  }, []);

  return (
    <main className={styles.container}>
      {isLoaded && <BoardPreview />}

      <div>Add Board</div>
      <CreateBoard />
    </main>
  );
}
