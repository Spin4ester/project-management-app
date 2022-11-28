import { BoardPreview } from 'components/BoardPreview/BoardPreview';
import { BoardPreviewModalEdit } from 'components/Modals/BoardPreviewModalEdit';
import { RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import styles from './Main.module.css';
import { deleteUserBoard, fetchUserBoards } from 'redux/BoardSlice';
import { DeleteModal } from 'components/Modals/DeleteModal';
import { BoardPreviewModalCreate } from 'components/Modals/BoardPreviewModalCreate';
import { openDeleteModal } from 'redux/ModalSlice';

export function Main() {
  const { isLoaded, toBeDeleteBoard } = useSelector((state: RootState) => state.board);
  // const isAuth = useSelector((state: RootState) => state.board.isLoaded);
  const userId = useSelector((state: RootState) => state.user.userId);
  const boardPreviews = useSelector((state: RootState) => state.board.previews);
  const isOpenDeleteModal = useSelector((state: RootState) => state.modal.main.deleteItemModal);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchUserBoards(userId));
  }, [userId]);

  return (
    <main className={styles.container}>
      {isLoaded && <BoardPreview />}
      <BoardPreviewModalCreate />
      <BoardPreviewModalEdit />
      {isOpenDeleteModal && (
        <DeleteModal
          onCancelClick={() => dispatch(openDeleteModal(false))}
          onDeleteClick={async () => {
            await dispatch(deleteUserBoard(toBeDeleteBoard));
            dispatch(fetchUserBoards(userId));
            dispatch(openDeleteModal(false));
          }}
        />
      )}
    </main>
  );
}
