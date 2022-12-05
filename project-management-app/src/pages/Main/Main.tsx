import { BoardPreview } from 'components/BoardPreview/BoardPreview';
import { BoardPreviewModalEdit } from 'components/Modals/BoardPreviewModalEdit';
import { AppDispatch, RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import styles from './Main.module.css';
import { deleteUserBoard, fetchUserBoards } from 'redux/BoardSlice';
import { DeleteModal } from 'components/Modals/DeleteModal';
import { BoardPreviewModalCreate } from 'components/Modals/BoardPreviewModalCreate';
import { openDeleteModal } from 'redux/ModalSlice';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';

export function Main() {
  const { isLoaded, toBeDeleteBoard, serverError } = useSelector((state: RootState) => state.board);
  const { userId } = useSelector((state: RootState) => state.user);
  const isOpenDeleteModal = useSelector((state: RootState) => state.modal.main.deleteItemModal);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserBoards(userId));
  }, [userId]);

  return (
    <main className={styles.container}>
      {!!serverError.statusCode && <ErrorMessage error={serverError} />}
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
