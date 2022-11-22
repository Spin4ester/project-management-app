import { BoardPreview } from 'components/BoardPreview/BoardPreview';
import { BoardPreviewModalEdit } from 'components/Modals/BoardPreviewModalEdit';
import { RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import styles from './Main.module.css';
import { fetchUserBoards } from 'redux/BoardSlice';
import { DeleteModal } from 'components/Modals/DeleteModal';
import { BoardPreviewModalCreate } from 'components/Modals/BoardPreviewModalCreate';

export function Main() {
  const isLoaded = useSelector((state: RootState) => state.board.isLoaded);
  const boardPreviews = useSelector((state: RootState) => state.board.previews);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchUserBoards(localStorage.getItem('userId')!));
  }, [dispatch]);

  return (
    <main className={styles.container}>
      {isLoaded && <BoardPreview />}
      <BoardPreviewModalCreate />
      <BoardPreviewModalEdit />
      <DeleteModal />
    </main>
  );
}
