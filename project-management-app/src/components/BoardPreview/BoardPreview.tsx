import React, { useEffect } from 'react';
import styles from './BoardPreview.module.css';
import EditIcon from '../../assets/icons/edit.png';
import DeleteIcon from '../../assets/icons/delete.png';
import { RootState } from 'Store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUserBoards } from 'common/asyncActions/fetchRequests';
import { IUserBoard } from 'common/types';
import { fetchUserBoards } from 'BoardSlice';
import AddPreview from '../../assets/icons/add-preview.png';
import { openCreateBoardModal } from 'ModalSlice';
import { useTranslation } from 'react-i18next';

export const BoardPreview = () => {
  const { t } = useTranslation();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const boardPreviews = useSelector((state: RootState) => state.board.previews);
  const isLoaded = useSelector((state: RootState) => state.board.isLoaded);
  const createBoardModal = useSelector((state: RootState) => state.modal.createBoardModal);
  const editBoardModal = useSelector((state: RootState) => state.modal.editBoardModal);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      {boardPreviews.map((el) => (
        <div key={el._id} className={styles.container}>
          <div className={styles.content}>
            <h6>{el.title}</h6>
            <div className={styles.icons_container}>
              <img className={styles.icon} src={EditIcon} alt="Edit"></img>
              <img className={styles.icon} src={DeleteIcon} alt="Delete"></img>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.add_board} onClick={() => dispatch(openCreateBoardModal(true))}>
        <img src={AddPreview} alt="Add board" />
        <h6>{t('CreateBoard')}</h6>
      </div>
    </>
  );
};
